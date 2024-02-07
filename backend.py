#!/bin/python3

import numpy as np
import pandas as pd
import networkx as nx
import py2cytoscape
import pandas as pd
import networkx as nx

# Function:
# Recieves a table of interactions and returns a networkx graph
# Input:
# edges_table - a table of edges properties
# nodes_table - a table of nodes properties
# Output:
# G - a networkx graph
def create_networkx_graph(edges_table, nodes_table):
    # Create a graph
    G = nx.Graph()
    # Add nodes to the graph
    for index, row in nodes_table.iterrows():
        G.add_node(row['name'], name=row['name'], type=row['type'], id=row['id'])
    # Add edges to the graph
    for index, row in edges_table.iterrows():
        G.add_edge(row['source'], row['target'], name=row['name'], type=row['type'], id=row['id'])
    return G

# Function:
# Recieves a networkx graph and returns a cytoscape graph
# Input:
# G - a networkx graph
# Output:
# cytoscape_graph - a cytoscape graph
def create_cytoscape_graph(G):
    # Create a cytoscape graph
    cytoscape_graph = py2cytoscape.cyrest.cyclient().network.create_from_networkx(G)
    return cytoscape_graph

def get_tables(G):
    # Create a pandas table of edges properties
    edges_table = nx.to_pandas_edgelist(G)
    
    # Create a pandas table of nodes properties
    nodes_table = nx.to_pandas_adjacency(G)
    
    return edges_table, nodes_table

# Function:
# Recieves a cytoscape graph and returns a networkx graph
# Input:
# cytoscape_graph - a cytoscape graph
# Output:
# G - a networkx graph
def create_networkx_graph_from_cytoscape_graph(cytoscape_graph):
    # Create a graph
    G = nx.Graph()
    # Add nodes to the graph
    for node in cytoscape_graph.nodes:
        G.add_node(node['data']['name'], name=node['data']['name'], type=node['data']['type'], id=node['data']['id'])
    # Add edges to the graph
    for edge in cytoscape_graph.edges:
        G.add_edge(edge['data']['source'], edge['data']['target'], name=edge['data']['name'], type=edge['data']['type'], id=edge['data']['id'])
    return G

# Function:
# Recieves a networkx graph and two nodes and returns the shortest path between them
# Input:
# G - a networkx graph
# source - the source node
# target - the target node
# Output:
# path - the shortest path between the two nodes
def get_shortest_path(G, source, target):
    # Get the shortest path between the two nodes
    path = nx.shortest_path(G, source, target)
    return path

# Function:
# Recieves a networkx graph and a node and returns the neighbors of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# neighbors - the neighbors of the node
def get_neighbors(G, node):
    # Get the neighbors of the node
    neighbors = list(G.neighbors(node))
    return neighbors

# Function:
# Recieves a networkx graph and a node and returns the predecessors of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# predecessors - the predecessors of the node
def get_predecessors(G, node):
    # Get the predecessors of the node
    predecessors = list(G.predecessors(node))
    return predecessors

# Function:
# Recieves a networkx graph and a node and returns the successors of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# successors - the successors of the node
def get_successors(G, node):
    # Get the successors of the node
    successors = list(G.successors(node))
    return successors

# Function:
# Recieves a networkx graph and a node and returns the degree of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# degree - the degree of the node
def get_degree(G, node):
    # Get the degree of the node
    degree = G.degree(node)
    return degree

# Function:
# Recieves a networkx graph and a node and returns the clustering coefficient of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# clustering_coefficient - the clustering coefficient of the node
def get_clustering_coefficient(G, node):
    # Get the clustering coefficient of the node
    clustering_coefficient = nx.clustering(G, node)
    return clustering_coefficient

# Function:
# Recieves a networkx graph and a node and returns the betweenness centrality of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# betweenness_centrality - the betweenness centrality of the node
def get_betweenness_centrality(G, node):
    # Get the betweenness centrality of the node
    betweenness_centrality = nx.betweenness_centrality(G, normalized=True)[node]
    return betweenness_centrality

# Function:
# Recieves a networkx graph and a node and returns the closeness centrality of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# closeness_centrality - the closeness centrality of the node
def get_closeness_centrality(G, node):
    # Get the closeness centrality of the node
    closeness_centrality = nx.closeness_centrality(G)[node]
    return closeness_centrality

# Function:
# Recieves a networkx graph and a node and returns the eigenvector centrality of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# eigenvector_centrality - the eigenvector centrality of the node
def get_eigenvector_centrality(G, node):
    # Get the eigenvector centrality of the node
    eigenvector_centrality = nx.eigenvector_centrality(G)[node]
    return eigenvector_centrality

# Function:
# Recieves a networkx graph and a node and returns the pagerank of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# pagerank - the pagerank of the node
def get_pagerank(G, node):
    # Get the pagerank of the node
    pagerank = nx.pagerank(G)[node]
    return pagerank

# Function:
# Recieves a networkx graph and a node and returns the degree centrality of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# degree_centrality - the degree centrality of the node
def get_degree_centrality(G, node):
    # Get the degree centrality of the node
    degree_centrality = nx.degree_centrality(G)[node]
    return degree_centrality

# Function:
# Recieves a networkx graph and a node and returns the average neighbor degree of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# average_neighbor_degree - the average neighbor degree of the node
def get_average_neighbor_degree(G, node):
    # Get the average neighbor degree of the node
    average_neighbor_degree = nx.average_neighbor_degree(G)[node]
    return average_neighbor_degree

# Function:
# Recieves a networkx graph and a node and returns the average degree connectivity of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# average_degree_connectivity - the average degree connectivity of the node
def get_average_degree_connectivity(G, node):
    # Get the average degree connectivity of the node
    average_degree_connectivity = nx.average_degree_connectivity(G)[node]
    return average_degree_connectivity

# Function:
# Recieves a networkx graph and a node and returns the breadth first search of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# breadth_first_search - the breadth first search of the node
def get_breadth_first_search(G, node):
    # Get the breadth first search of the node
    breadth_first_search = nx.bfs_tree(G, node)
    return breadth_first_search

# Function:
# Recieves a networkx graph and a node and returns the depth first search of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# depth_first_search - the depth first search of the node
def get_depth_first_search(G, node):
    # Get the depth first search of the node
    depth_first_search = nx.dfs_tree(G, node)
    return depth_first_search

# Function:
# Recieves a networkx graph and a node and returns the bidirectional breadth first search of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# bidirectional_breadth_first_search - the bidirectional breadth first search of the node
def get_bidirectional_breadth_first_search(G, node):
    # Get the bidirectional breadth first search of the node
    bidirectional_breadth_first_search = nx.bidirectional_bfs(G, node)
    return bidirectional_breadth_first_search

# Function:
# Recieves a networkx graph and a node and returns the bidirectional depth first search of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# bidirectional_depth_first_search - the bidirectional depth first search of the node
def get_bidirectional_depth_first_search(G, node):
    # Get the bidirectional depth first search of the node
    bidirectional_depth_first_search = nx.bidirectional_dfs(G, node)
    return bidirectional_depth_first_search

# Function:
# Recieves a networkx graph and a node and returns the topological sort of the node
# Input:
# G - a networkx graph
# node - the node
# Output:
# topological_sort - the topological sort of the node
def get_topological_sort(G, node):
    # Get the topological sort of the node
    topological_sort = nx.topological_sort(G)
    return topological_sort

# Function:
# Recieves a networkx graph and two nodes and returns the search between them using the A* algorithm
# Input:
# G - a networkx graph
# source - the source node
# target - the target node
# Output:
# astar_path - the search between them using the A* algorithm
def get_astar_path(G, source, target):
    # Get the search between them using the A* algorithm
    astar_path = nx.astar_path(G, source, target)
    return astar_path

# Function:
# Recieves a networkx graph and two nodes and returns the search between them using the shortest path algorithm
# Input:
# G - a networkx graph
# source - the source node
# target - the target node
# Output:
# shortest_path - the search between them using the shortest path algorithm
def get_shortest_path(G, source, target):
    # Get the search between them using the shortest path algorithm
    shortest_path = nx.shortest_path(G, source, target)
    return shortest_path

# Function:
# Recieves a networkx graph and two nodes and returns the search between them using the shortest path length algorithm
# Input:
# G - a networkx graph
# source - the source node
# target - the target node
# Output:
# shortest_path_length - the search between them using the shortest path length algorithm
def get_shortest_path_length(G, source, target):
    # Get the search between them using the shortest path length algorithm
    shortest_path_length = nx.shortest_path_length(G, source, target)
    return shortest_path_length