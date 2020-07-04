import time


# Union-Find array data structure
class Union_Find(object):
    def __init__(self, n):
        self._parents = list(range(1, n + 1))
        self._cluster_sizes = [1] * n
        self._num_clusters = n

    def root(self, node):
        p = node
        while p != self._parents[p - 1]:
            p = self._parents[p - 1]
        return p

    # input: old root, new root, new cluster size
    # output: number of root updates
    def _combine(self, old_root, new_root, new_cluster_size):
        self._num_clusters -= 1
        for node_i, parent in enumerate(self._parents):
            if parent == old_root:
                self._parents[node_i] = new_root
            if parent == old_root or parent == new_root:
                self._cluster_sizes[node_i] = new_cluster_size

    def union(self, u, v):
        u_root = self.root(u)
        v_root = self.root(v)
        if u_root == v_root:
            return

        u_cluster_size = self._cluster_sizes[u - 1]
        v_cluster_size = self._cluster_sizes[v - 1]
        new_cluster_size = u_cluster_size + v_cluster_size

        if u_cluster_size >= v_cluster_size:
            self._combine(v_root, u_root, new_cluster_size)
        else:
            self._combine(u_root, v_root, new_cluster_size)

    def get_num_clusters(self):
        return self._num_clusters


# input: code (string) with n length
# output: an array containing "n choose 1" codes (strings) 1 unit away from input code
def generate_codes_1_unit_away(code):
    codes_1_unit_away = {}
    for i, num in enumerate(code):
        a = list(code)
        a[i] = '0' if num == '1' else '1'
        gen_code = ''.join(a)
        codes_1_unit_away[gen_code] = 1
    return list(codes_1_unit_away.keys())


# input: code (string) with n length
# output: an array containing "n choose 2" codes (strings) 2 units away from input code
def generate_codes_2_units_away(code):
    codes_2_units_away = {}
    for i, num in enumerate(code):
        a = list(code)
        a[i] = '0' if num == '1' else '1'
        changed_i = i
        mod_code = ''.join(a)
        for j, second_num in enumerate(mod_code):
            b = list(mod_code)
            if j != changed_i:
                b[j] = '0' if second_num == '1' else '1'
                gen_code = ''.join(b)
                codes_2_units_away[gen_code] = 1
    return list(codes_2_units_away.keys())


# input: filename
# output: hash with codes as keys and an array of vertices with that code as values
def populate_code_v_hash(filename):
    code_v_hash = {}
    with open(filename) as f_handle:
        f_handle.readline()
        for i, line in enumerate(f_handle):
            code = line.replace(' ', '').strip()
            code_v_hash.setdefault(code, []).append(i + 1)
    return code_v_hash


# input: filename, min_spacing "permissibl"e" for k clustering (as we have better, more defined
# clusters when spacing is maximized)
# output: max num of clusters possible to get at least desired min_spacing provided, i.e. so that
# all pairs of nodes with <=min_spacing-1 different bits fall into the same clusters
def max_k_clusters_for_min_spacing(filename, min_spacing):
    code_v_hash = populate_code_v_hash(filename)

    with open(filename) as f_handle:
        num_nodes = int(f_handle.readline().split()[0])

        union_find = Union_Find(num_nodes)
        hamming_distances = []
        for i, line in enumerate(f_handle):
            current_v = i + 1
            code = line.replace(' ', '').strip()

            codes_1_unit_away = generate_codes_1_unit_away(code)

            codes_2_units_away = generate_codes_2_units_away(code)

            hamming_distances = [code] + codes_1_unit_away + codes_2_units_away
            for h_code in hamming_distances:
                vertices_with_h_code = code_v_hash[
                    h_code] if h_code in code_v_hash else []
                for v in vertices_with_h_code:
                    if v != current_v:
                        union_find.union(current_v, v)

    return union_find.get_num_clusters()


def main():
    start = time.time()
    # expected example result: 2]
    print('start: ', start)

    result = max_k_clusters_for_min_spacing(
        './greedyAndDynamic/week2/clustering_big.txt', 3)
    print('result: ', result)
    print('elapsed time: ', time.time() - start)


main()