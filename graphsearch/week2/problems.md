Consider a directed graph with distinct and nonnegative edge lengths and a source vertex s. Fix a destination vertex t, and assume that the graph contains at least one s-t path. Which of the following statements are true? [Check all that apply.]
 
 a. here is a shortest s−t path with no repeated vertices (i.e., a "simple" or "loopless" such path).
 > 正确

b. The shortest (i.e., minimum-length) s-t path might have as many as n−1 edges, where n is the number of vertices.
> 显而易见 一个链表

c. The shortest s-t path must include the minimum-length edge of G.
> 不太一定 例如 1 2 3, 1 2 8, 1 3 10 1->3最短是10 不包含3
----
Consider a directed graph GG with a source vertex ss, a destination tt, and nonnegative edge lengths. Under what conditions is the shortest ss-tt path guaranteed to be unique?
a. When all edge lengths are distinct positive integers.

b. When all edge lengths are distinct powers of 2.

c. When all edges lengths are distinct positive integers and the graph.

d. None of the other options are correct.
> 选b. Two sums of distinct powers of two cannot be the same (imagine the numbers are written in binary).
---
Consider a directed graph GG and a source vertex ss. Suppose GG has some negative edge lengths but no negative cycles, meaning GG does not have a directed cycle in which the sum of the edge lengths is negative. Suppose you run Dijkstra's algorithm on GG (with source ss). Which of the following statements are true? [Check all that apply.]
> 算法会结束，而且有时会得到正确答案。 Nonnegativity of the edge lengths was used in the correctness proof for Dijkstra's algorithm; with negative edge lengths, the algorithm is no longer correct in general.