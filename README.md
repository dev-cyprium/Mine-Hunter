# Mine Hunter

## About
Minehunter is a game inspired by Minesweper that you can play in your browser. It started
as a fun 6 hours project, but I've keept adding and adding to it until it became a full-blown minesweeper clone
with online scoring system.

## Features
 * Fully functional online clone of Minesweeper
 * Compete online with other users to get the best time.

## Specs
This application was made in Ruby on Rails.
Note: It's a side project to test what I've learned so far on the great [Odin project](http://www.theodinproject.com/)

## How to play
The goal is to uncover all the mines on the game board and to do it in the least amount of time possible.
In order to help you, cells with mines around them are displaying a counter to show you exactly how many mines
are in a 8x8 grid around that cell.

## Issues/Known Bugs
 * Currently, all the game board logic is handled client-side which could lead to potential hacks, and unvanted user bahaivour
 * The AjaX system was rush and therefore it's poorly designed
 * The grid dosn't fit well on some resolutions ( Not responsive )
