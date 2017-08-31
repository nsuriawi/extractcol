Relevant files:
  colorExtractor.html
  histor.js
  nearesColor.js



Sources and help:
  http://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mouseover
  http://bl.ocks.org/jinroh/4666920
  https://github.com/dtao/nearest-color
  https://github.com/Nycto/PicoModal









PLANS


Bug report:

Vertical bar reading is printing out an error, looks like it is reaching the end of the array before finishing printing RB values in sample. [ ]

colorscaling is not working properly, it looks like the modalClose function must be used before to update the domain, it is not updating properly. [x] Done.


As of now:
- Bar can be selected with brush and clicking anywhere in the canvas will allow numerical defined values as long as the bar has a linear progression.
- The algorithm for sorting the bar runs at: O(n) 

	* The algo creates a one dimensional array from the selected area to make parsing data faster

-Matching colors between the bar and selected values from "click" -ing are found using the nearestColor.js

Moving Forward:

- Upon second time selection with brush, let users select whole area, specify size and shape of boxes, and create a downloadable 2-D array.
- Allow for logarithmic progression on the bar as well
- Create a more user-friendly UI for uploading files.
- If the time complexity proves to be a larger problem, look to improving this. 
