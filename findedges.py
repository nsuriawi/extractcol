# -*- coding: utf-8 -*-
"""
Created on Mon Jun 26 14:44:52 2017

@author: Nathaniel
"""
from scipy import misc
import numpy as np
from scipy import ndimage
import matplotlib.pyplot as plt

hmap = misc.imread('test2seg.png')
type(hmap)
hmap.shape, hmap.dtype
plt.imshow(hmap)

#im = np.zeros((256, 256))
#im[64:-64, 64:-64] = 1

#im = ndimage.rotate(im, 15, mode='constant')
#im = ndimage.gaussian_filter(im, 8)

im = hmap

sx = ndimage.sobel(im, axis=0, mode='constant')
sy = ndimage.sobel(im, axis=1, mode='constant')
sob = np.hypot(sx, sy)

plt.figure(figsize=(160, 50))
plt.subplot(141)
plt.imshow(im, cmap=plt.cm.gray)
plt.axis('off')
plt.title('square', fontsize=20)
plt.subplot(142)
plt.imshow(sx)
plt.axis('off')
plt.title('Sobel (x direction)', fontsize=20)
plt.subplot(143)
plt.imshow(sob)
plt.axis('off')
plt.title('Sobel filter', fontsize=20)

im += 0.07*np.random.random(im.shape)

sx = ndimage.sobel(im, axis=0, mode='constant')
sy = ndimage.sobel(im, axis=1, mode='constant')
sob = np.hypot(sx, sy)

plt.subplot(144)
plt.imshow(sob)
plt.axis('off')
plt.title('Sobel for noisy image', fontsize=20)



plt.subplots_adjust(wspace=0.02, hspace=0.02, top=1, bottom=0, left=0, right=0.9)

plt.show()