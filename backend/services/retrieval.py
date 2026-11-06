"""
Passage retrieval service for long reference documents.
When reference evidence is extensive, extracts the most relevant passages
for a specific claim using BM25 / token overlap before LLM prompt injection.
"""

import re
from typing import List, Tuple


def split_into_passages(text: str, max_chunk_sentences: int = 3, stride: int = 2) -> List[str]:
    """Split raw text into overlapping multi-sentence passages."""
    if not text or not text.strip():
        return []
    
    # Split by sentence boundaries (. ! ?) while keeping abbreviations in mind
    raw_sentences = re.split(r'(?<=[.?!])\s+(?=[A-Z0-9"\'])', text.strip())
    sentences = [s.strip() for s in raw_sentences if s.strip()]
    
    if len(sentences) <= max_chunk_sentences:
        return [" ".join(sentences)]
    
    passages = []
    for i in range(0, len(sentences), stride):
        chunk = sentences[i : i + max_chunk_sentences]
        if chunk:
            passages.append(" ".join(chunk))
        if i + max_chunk_sentences >= len(sentences):
            break
            
    return passages


def retrieve_relevant_passages(claim: str, reference_text: str, top_k: int = 3, max_char_threshold: int = 1200) -> Tuple[str, bool]:
    """
    If reference_text exceeds max_char_threshold, retrieves top_k most relevant passages.
    Returns: (evidence_to_use, was_retrieved_bool)
    """
    if not reference_text or not reference_text.strip():
        return "", False
    
    clean_ref = reference_text.strip()
    if len(clean_ref) <= max_char_threshold:
        return clean_ref, False

    passages = split_into_passages(clean_ref)
    if len(passages) <= 1:
        return clean_ref, False

    # Try BM25 if available, otherwise fallback to token overlap scoring
    try:
        from rank_bm25 import BM25Okapi
        tokenized_corpus = [re.findall(r'\w+', p.lower()) for p in passages]
        bm25 = BM25Okapi(tokenized_corpus)
        tokenized_query = re.findall(r'\w+', claim.lower())
        scores = bm25.get_scores(tokenized_query)
    except Exception:
        # Fallback keyword overlap scoring
        query_words = set(re.findall(r'\w+', claim.lower()))
        scores = []
        for p in passages:
            passage_words = set(re.findall(r'\w+', p.lower()))
            overlap = len(query_words.intersection(passage_words))
            scores.append(overlap)

    # Rank passages by score
    indexed_scores = list(enumerate(scores))
    indexed_scores.sort(key=lambda x: x[1], reverse=True)
    
    selected_indices = [idx for idx, _ in indexed_scores[:top_k]]
    # Re-order by appearance in original document for logical flow
    selected_indices.sort()
    
    selected_passages = [passages[i] for i in selected_indices]
    retrieved_evidence = "\n\n[...]\n\n".join(selected_passages)
    
    return retrieved_evidence, True

