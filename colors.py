# -*- coding: utf-8 -*-
"""
Created on Tue Jun 27 15:08:40 2017

@author: Nathaniel
"""

import matplotlib as m
import matplotlib.pyplot as plt
import numpy as np

coldic = {
         'red':   [(0.0, 0.0, 1.0),
                   (0.5, 1.0, 1.0),
                   (1.0, 0.0, 0.0)],

         'green': [(0.0, 0.0, 0.0),
                   (0.5, 1.0, 1.0),
                   (1.0, 0.0, 0.0)],

         'blue':  [(0.0, 0.0, 0.0),
                   (0.5, 1.0, 1.0),
                   (1.0, 1.0, 0.0)],
}
colmap = m.colors.LinearSegmentedColormap('b2r', coldic, 255)

x = np.arange(0, 10, 1)
y = np.arange(0, 10, 1)
X, Y = np.meshgrid(x,y)
data = np.random.uniform(-.25,.25,(9,9))
file = open('data2.txt', 'w')
for auto in data:    
    file.write("%s\n" % auto)
file.close()

def do_plot(n,f,title):
    #fig, ax = plt.subplots()
    plt.subplot(1,1,n)
    plt.pcolor(X,Y, f(data), cmap = colmap, vmin = -.25, vmax = .25)
    plt.title(title)
    plt.colorbar()
    #plt.xaxis.tick_top()
    #ax.set_xticks(np.arange(data.shape[1]) + 0.5, minor=False)
    #ax.set_yticks(np.arange(data.shape[0]) + 0.5, minor=False)
    
plt.figure()
#do_plot(1, data, "test")
do_plot(1, lambda x:x, "somethingine")
plt.show