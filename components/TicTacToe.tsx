'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { gameUtils } from '@/lib/utils'
import { Sparkles, Trophy, RotateCcw, Zap, Heart, Star } from 'lucide-react'
import Lottie from 'lottie-react'

interface GameState {
  board: string[]
  currentPlayer: 'X' | 'O'
  isGameOver: boolean
  winner: string | null
  winningLine: number[] | null
  scores: { X: number; O: number; draws: number }
}

const initialGameState: GameState = {
  board: Array(9).fill(''),
  currentPlayer: 'X',
  isGameOver: false,
  winner: null,
  winningLine: null,
  scores: { X: 0, O: 0, draws: 0 }
}

const cellVariants = {
  initial: { scale: 0, rotateY: 180 },
  animate: { scale: 1, rotateY: 0 },
  exit: { scale: 0, rotateY: 180 },
  hover: { scale: 1.05, rotateY: 10 },
  tap: { scale: 0.95 }
}

const boardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const BackgroundParticles = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Only run on client side
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    updateSize()

    // Listen for resize
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Don't render particles until we have window dimensions
  if (windowSize.width === 0) return null

  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-game-purple to-game-pink rounded-full"
      initial={{
        x: Math.random() * windowSize.width,
        y: windowSize.height + 50,
        opacity: 0
      }}
      animate={{
        y: -50,
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "linear"
      }}
    />
  ))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles}
    </div>
  )
}

const Confetti = ({ isVisible }: { isVisible: boolean }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Only run on client side
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    updateSize()

    // Listen for resize
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  if (!isVisible || windowSize.width === 0) return null

  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute w-3 h-3 ${
        i % 4 === 0 ? 'bg-game-purple' :
        i % 4 === 1 ? 'bg-game-pink' :
        i % 4 === 2 ? 'bg-game-blue' : 'bg-game-green'
      } rounded`}
      initial={{
        x: Math.random() * windowSize.width,
        y: -50,
        rotate: 0
      }}
      animate={{
        y: windowSize.height + 50,
        rotate: 720,
        x: Math.random() * windowSize.width
      }}
      transition={{
        duration: Math.random() * 2 + 1,
        ease: "linear"
      }}
    />
  ))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces}
    </div>
  )
}

export default function TicTacToe() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleCellClick = useCallback((index: number) => {
    if (gameState.board[index] || gameState.isGameOver) return

    const newBoard = [...gameState.board]
    newBoard[index] = gameState.currentPlayer

    const { winner, line } = gameUtils.checkWinner(newBoard)
    const isDraw = !winner && gameUtils.checkDraw(newBoard)

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      isGameOver: !!winner || isDraw,
      winner,
      winningLine: line,
      scores: winner ? {
        ...prev.scores,
        [winner]: prev.scores[winner as keyof typeof prev.scores] + 1
      } : isDraw ? {
        ...prev.scores,
        draws: prev.scores.draws + 1
      } : prev.scores
    }))

    if (winner || isDraw) {
      setTimeout(() => {
        setShowVictoryModal(true)
        if (winner) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
        }
      }, 500)
    }
  }, [gameState.board, gameState.isGameOver, gameState.currentPlayer])

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...initialGameState,
      scores: prev.scores
    }))
    setShowVictoryModal(false)
    setShowConfetti(false)
  }, [])

  const resetScores = useCallback(() => {
    setGameState(initialGameState)
    setShowVictoryModal(false)
    setShowConfetti(false)
  }, [])

  const getPlayerIcon = (player: string) => {
    return player === 'X' ? (
      <Zap className="w-8 h-8 text-game-orange" />
    ) : (
      <Heart className="w-8 h-8 text-game-pink" />
    )
  }

  const getCellContent = (value: string, index: number) => {
    if (!value) return null

    const isWinning = gameState.winningLine?.includes(index)
    
    return (
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          ...(isWinning && { scale: [1, 1.2, 1] })
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 15,
          ...(isWinning && { repeat: Infinity, duration: 0.8 })
        }}
        className="flex items-center justify-center"
      >
        {getPlayerIcon(value)}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <BackgroundParticles />
      <Confetti isVisible={showConfetti} />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.h1 
          className="text-6xl font-bold font-quicksand text-gradient mb-4"
          animate={{ 
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          Tic Tac Toe
        </motion.h1>
        
        <motion.div
          className="flex items-center justify-center gap-2 text-slate-300"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-poppins">Modern • Sleek • Beautiful</span>
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Score Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="game-card p-6 mb-8 max-w-md w-full"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-game-orange" />
              <span className="font-quicksand font-semibold text-white">Player X</span>
            </div>
            <div className="text-2xl font-bold text-game-orange">{gameState.scores.X}</div>
          </div>
          <div className="space-y-2">
            <div className="font-quicksand font-semibold text-slate-300">Draws</div>
            <div className="text-2xl font-bold text-slate-300">{gameState.scores.draws}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-game-pink" />
              <span className="font-quicksand font-semibold text-white">Player O</span>
            </div>
            <div className="text-2xl font-bold text-game-pink">{gameState.scores.O}</div>
          </div>
        </div>
      </motion.div>

      {/* Current Player */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mb-8 p-4 game-card"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {getPlayerIcon(gameState.currentPlayer)}
        </motion.div>
        <span className="text-xl font-quicksand font-semibold text-white">
          Player {gameState.currentPlayer}&apos;s Turn
        </span>
      </motion.div>

      {/* Game Board */}
      <motion.div
        variants={boardVariants}
        initial="initial"
        animate="animate"
        className="game-card p-8 mb-8"
      >
        <div className="grid grid-cols-3 gap-4 w-80 h-80">
          {gameState.board.map((cell, index) => (
            <motion.div
              key={index}
              variants={cellVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className={`
                aspect-square bg-gradient-to-br from-slate-800/50 to-slate-700/50 
                border-2 border-slate-600/30 rounded-xl cursor-pointer
                flex items-center justify-center transition-all duration-200
                hover:border-game-purple/50 hover:shadow-lg hover:shadow-game-purple/25
                ${gameState.winningLine?.includes(index) ? 'border-game-green shadow-lg shadow-game-green/50 animate-pulse' : ''}
                ${cell ? 'cursor-not-allowed' : ''}
              `}
              onClick={() => handleCellClick(index)}
            >
              {getCellContent(cell, index)}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <Button
          onClick={resetGame}
          variant="game"
          size="lg"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          New Game
        </Button>
        
        <Button
          onClick={resetScores}
          variant="outline"
          size="lg"
          className="flex items-center gap-2 border-slate-600 text-slate-300 hover:text-white"
        >
          <Star className="w-5 h-5" />
          Reset Scores
        </Button>
      </motion.div>

      {/* Victory Modal */}
      <Dialog open={showVictoryModal} onOpenChange={setShowVictoryModal}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-purple-900 border-game-purple/50 text-white">
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="flex items-center justify-center mb-4"
            >
              {gameState.winner ? (
                <Trophy className="w-16 h-16 text-yellow-400" />
              ) : (
                <div className="flex gap-2">
                  <Zap className="w-12 h-12 text-game-orange" />
                  <Heart className="w-12 h-12 text-game-pink" />
                </div>
              )}
            </motion.div>
            
            <DialogTitle className="text-3xl font-quicksand font-bold text-gradient">
              {gameState.winner ? `Player ${gameState.winner} Wins!` : "It's a Draw!"}
            </DialogTitle>
            
            <DialogDescription className="text-lg text-slate-300 mt-2">
              {gameState.winner 
                ? "Congratulations on your victory!" 
                : "Great game! You both played well."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-4 mt-6">
            <Button
              onClick={resetGame}
              variant="game"
              className="flex-1"
            >
              Play Again
            </Button>
            <Button
              onClick={() => setShowVictoryModal(false)}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 