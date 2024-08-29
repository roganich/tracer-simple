#!/bin/python3
import numpy as np
import pandas as pd
import networkx as nx
import scipy as sp

total_nodes = 235
iso_nodes = 33
filtered_nodes = total_nodes - iso_nodes
total_edges = 302
lattice_edges = 2


"""
    Function: Create a scale-free graph using the Barabási-Albert model.
    Parameters:
    1) n: Number of nodes in the graph.
    2) m: Number of edges to attach from a new node to existing nodes.
    Returns: A NetworkX graph object representing the scale-free network.
"""
def create_scale_free_graph(n, m):
    if m < 1 or m >= n:
        raise ValueError("m must be between 1 and n-1")
    # Generate the scale-free graph
    G = nx.barabasi_albert_graph(n, m)
    return G

"""
    Function: Create a small-world graph using the Watts-Strogatz model.
    Parameters:
    1) n: Number of nodes in the graph.
    2) k: Each node is initially connected to k nearest neighbors in a ring.
    3) p: Probability of rewiring each edge.    
    Returns: A NetworkX graph object representing the small-world network.
"""
def create_small_world_graph(n, k, p):
    if k >= n:
        raise ValueError("k must be less than n")
    if not (0 <= p <= 1):
        raise ValueError("p must be between 0 and 1")
    # Generate the small-world graph
    G = nx.watts_strogatz_graph(n, k, p)
    return G

"""
    Function: Calculate the network density of a graph.
    Parameters:
    1) G: A NetworkX graph object (can be directed or undirected).
    Returns: The density of the graph.
"""
def calculate_network_density(G):
    num_nodes = G.number_of_nodes()
    num_edges = G.number_of_edges()
    
    if num_nodes <= 1:
        return 0.0
    
    if G.is_directed():
        # For directed graphs
        density = num_edges / (num_nodes * (num_nodes - 1))
    else:
        # For undirected graphs
        density = 2 * num_edges / (num_nodes * (num_nodes - 1))
    
    return density

"""
    Function: Calculate the Estrada Normalized Index (ENI) for a graph. 
    Parameters:
    1) G: A NetworkX graph object.
    Returns: The Estrada Normalized Index of the graph.
    """
def calculate_estrada_normalized_index(G):
    estrada_index = 0
    for node in G.nodes():
        for neighbor in G.neighbors(node):
            estrada_index += (1/np.sqrt(G.degree[node]) - 1/np.sqrt(G.degree[neighbor]))**2
    
    estrada_normalized_index = estrada_index/(G.number_of_nodes() - 2*np.sqrt(G.number_of_nodes()-1))  
    return estrada_normalized_index

def calculate_TMH(G):
    sum_numerator = 0
    sum_denominator = 0
    for node in G.nodes():
        sum_numerator += G.degree(node)**2
        sum_denominator += G.degree(node)   
    TMH = sum_numerator/sum_denominator
    return TMH

df_networkAttributes = pd.DataFrame(columns=('Graph', 'Network_Density', 'Estrada_Normalized_Index', 'Clustering_Coefficient', 'TMH'))


sf_G = create_scale_free_graph(total_nodes, total_nodes-1)
sw_G = create_small_world_graph(total_nodes, lattice_edges, np.abs(2*(total_edges/(total_nodes*lattice_edges)-1)))

scaleFree_arr = ['scale_free'+str(total_nodes), calculate_network_density(sf_G), calculate_estrada_normalized_index(sf_G), nx.average_clustering(sf_G), calculate_TMH(sf_G)]
smallWorld_arr  = ['small_world'+str(total_nodes), calculate_network_density(sw_G), calculate_estrada_normalized_index(sw_G), nx.average_clustering(sw_G), calculate_TMH(sw_G)]

df_networkAttributes.loc[len(df_networkAttributes)] = scaleFree_arr
df_networkAttributes.loc[len(df_networkAttributes)] = smallWorld_arr

df_networkAttributes.to_csv('networkAttributes.csv', index=False)

















