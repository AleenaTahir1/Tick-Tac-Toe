import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const gameUtils = {
  checkWinner: (board: string[]): { winner: string | null; line: number[] | null } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: lines[i] };
      }
    }
    return { winner: null, line: null };
  },

  checkDraw: (board: string[]): boolean => {
    return board.every(cell => cell !== '');
  },

  getEmptyCells: (board: string[]): number[] => {
    return board.map((cell, index) => cell === '' ? index : -1).filter(val => val !== -1);
  }
}; 