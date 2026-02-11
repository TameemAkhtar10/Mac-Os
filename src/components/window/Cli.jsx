import React, { useState, useRef, useEffect } from 'react'
import MacWindow from './MacWindow'
import "./Cli.scss"

const Cli = ({setwindow,windowname}) => {
    const [history, setHistory] = useState([])
    const [input, setInput] = useState('')
    const [cmdHistory, setCmdHistory] = useState([])
    const [histIndex, setHistIndex] = useState(-1)
    const [currentDir, setCurrentDir] = useState('~')
    const inputRef = useRef(null)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    const fileSystem = {
        '~': {
            type: 'dir',
            children: ['README.md', 'resume.pdf', 'projects', 'skills', '.secret', '.hire-me']
        },
        '~/projects': {
            type: 'dir',
            children: ['portfolio', 'ecommerce', 'chatapp', 'taskflow', 'dashboard']
        },
        '~/projects/portfolio': {
            type: 'dir',
            children: ['index.jsx', 'package.json', 'README.md']
        },
        '~/projects/ecommerce': {
            type: 'dir',
            children: ['server.js', 'routes.js', 'models', 'README.md']
        },
        '~/projects/chatapp': {
            type: 'dir',
            children: ['app.js', 'socket.js', 'README.md']
        },
        '~/projects/taskflow': {
            type: 'dir',
            children: ['pages', 'prisma', 'README.md']
        },
        '~/projects/dashboard': {
            type: 'dir',
            children: ['App.jsx', 'charts', 'README.md']
        },
        '~/skills': {
            type: 'dir',
            children: ['frontend.txt', 'backend.txt', 'devops.txt']
        }
    }

    const fileContents = {
        'README.md': `# Tameem Akhtar\nFull-Stack Developer | React | Node.js\nType 'help' to explore.`,
        '.secret': `You found it 🥚\nMy rubber duck's name: Sir Debugs-a-Lot 🦆\nI mass-delete more code than I write.`,
        '.hire-me': `You're thorough. I like that.\nWe should work together.\n📧 akhtartamimm@example.com\n📱 9765587427`,
        'resume.pdf': `[Binary file — type 'resume' to open in browser]`,
        '~/projects/portfolio/index.jsx': `import React from 'react'\n// This portfolio you're looking at right now\n// Built with mass-love and mass-chai ☕`,
        '~/projects/portfolio/package.json': `{\n  "name": "tameem-portfolio",\n  "version": "2.0.0",\n  "stack": "React + Vite + SCSS"\n}`,
        '~/projects/portfolio/README.md': `# Portfolio\nTerminal-style portfolio built with React.\nFeatures: CLI, Mac windows, draggable UI`,
        '~/projects/ecommerce/server.js': `const express = require('express')\n// REST API handling 10K+ products\n// Stripe integration for payments`,
        '~/projects/ecommerce/README.md': `# E-Commerce Platform\nMERN Stack · Stripe · Admin Panel\n10K+ products · 2K+ users`,
        '~/projects/chatapp/README.md': `# Real-Time Chat\nSocket.io · React · MongoDB\nGroup chats · File sharing · WebRTC`,
        '~/projects/taskflow/README.md': `# TaskFlow\nNext.js · Prisma · PostgreSQL\nDrag & drop · Real-time sync · Teams`,
        '~/projects/dashboard/README.md': `# Data Dashboard\nReact · Chart.js · D3.js\nLive charts · CSV export · Dark mode`,
        '~/skills/frontend.txt': `React        ████████████████████░░  92%\nVue.js       ██████████████████░░░░  85%\nTypeScript   █████████████████░░░░░  80%\nHTML/CSS     ████████████████████░░  95%\nSass/SCSS    ██████████████████░░░░  88%`,
        '~/skills/backend.txt': `Node.js      ████████████████████░░  90%\nExpress      ██████████████████░░░░  85%\nPython       █████████████████░░░░░  78%\nDjango       ██████████████░░░░░░░░  70%`,
        '~/skills/devops.txt': `Docker       ██████████████████░░░░  85%\nAWS          █████████████████░░░░░  80%\nGit          ████████████████████░░  93%\nCI/CD        ██████████████░░░░░░░░  72%`,
    }

    const resolvePath = (path) => {
        if (path === '~' || path === '/') return '~'
        if (path.startsWith('~/')) return path
        if (path.startsWith('/')) return '~' + path
        if (currentDir === '~') return '~/' + path
        return currentDir + '/' + path
    }

    const commands = {
        help: () => `Available Commands:
───────────────────────────────
  about · skills · projects · experience
  education · contact · social · resume
  ls · cat · pwd · cd · mkdir · touch
  whoami · date · echo · grep · head
  ping · neofetch · joke · quote · history
  sudo · matrix · weather · secret · tree
  hire-me · clear · exit · hostname · uname
  open · man · which · top`,

        about: () => `Hey! I'm Tameem Akhtar 👋
Full-Stack Developer from Kamptee, Nagpur.
I convert chai into mass-production code.
Currently open to opportunities 🟢`,

        skills: () => `FRONTEND
React        ████████████████████░░  92%
Vue.js       ██████████████████░░░░  85%
TypeScript   █████████████████░░░░░  80%
HTML/CSS     ████████████████████░░  95%

BACKEND
Node.js      ████████████████████░░  90%
Express      ██████████████████░░░░  85%
Python       █████████████████░░░░░  78%
Django       ██████████████░░░░░░░░  70%

DATABASE
MongoDB      ██████████████████░░░░  88%
PostgreSQL   █████████████████░░░░░  82%

DEVOPS
Docker       ██████████████████░░░░  85%
AWS          █████████████████░░░░░  80%
Git          ████████████████████░░  93%`,

        projects: () => `[01] Portfolio Website — React + Vite
[02] E-Commerce Platform — MERN Stack
[03] Task Management App — Next.js + Prisma
[04] Real-Time Chat — Socket.io + React
[05] Data Dashboard — React + Chart.js

Type 'project <number>' for details
Type 'cd projects' to browse project files`,

        project: (args) => {
            const d = {
                '1': `Portfolio Website\nStack: React, Vite, SCSS\nFeatures: Terminal UI, Mac-style windows\ngithub.com/tameem/portfolio`,
                '2': `E-Commerce Platform\nStack: MongoDB, Express, React, Node.js\nFeatures: Stripe, admin panel, 10K+ products\ngithub.com/tameem/ecommerce`,
                '3': `Task Management App\nStack: Next.js, Prisma, PostgreSQL\nFeatures: Drag & drop, real-time sync\ngithub.com/tameem/taskflow`,
                '4': `Real-Time Chat\nStack: React, Socket.io, MongoDB\nFeatures: Group chats, file sharing, WebRTC\ngithub.com/tameem/chatapp`,
                '5': `Data Dashboard\nStack: React, Chart.js, D3.js\nFeatures: Live charts, CSV export, dark mode\ngithub.com/tameem/dashboard`,
            }
            if (!args[0]) return 'Usage: project <number>'
            return d[args[0]] || 'Project not found. Try 1-5'
        },

        experience: () => `Senior Developer — Tech Corp        2022 → Present
├ Led team of 5, shipped 5+ React apps
├ Cut page load by 60%
└ Mentored 3 junior devs

Full-Stack Dev — Web Solutions       2020 → 2022
├ Built APIs handling 10K+ req/min
├ Migrated jQuery → React
└ Won internal hackathon 🏆

Freelance Developer                  2018 → 2020
├ 20+ client projects delivered
└ 5-star Upwork rating`,

        education: () => `BS Computer Science — [University]   2016–2020
GPA 3.7/4.0 · Dean's List`,

        contact: () => `Name      Tameem Akhtar
Email     tameemakhtar@example.com
Phone     +91 9765587427
Location  Kamptee, Nagpur
Status    🟢 Available for hire`,

        social: () => `GitHub     github.com/tameemakhtar
LinkedIn   linkedin.com/in/tameemakhtar
Twitter    @tameemdev
Portfolio  tameemakhtar.dev`,

        github: () => {
            window.open('https://github.com/tameemakhtar10', '_blank')
            return '🐙 Opening GitHub...'
        },

        resume: () => {
            window.open('/resume.pdf', '_blank')
            return '📄 Resume opened in new tab!'
        },

        ls: (args) => {
            const dir = fileSystem[currentDir]
            if (!dir) return 'ls: cannot access: No such directory'

            if (args[0] === '-la') {
                let output = `total ${dir.children.length}\ndrwxr-xr-x  tameem staff  4096 Jun 10 .\ndrwxr-xr-x  tameem staff  4096 Jun 10 ..`
                dir.children.forEach(child => {
                    const fullPath = currentDir === '~' ? '~/' + child : currentDir + '/' + child
                    const isDir = fileSystem[fullPath]
                    const prefix = child.startsWith('.') ? '-rw-------' : (isDir ? 'drwxr-xr-x' : '-rw-r--r--')
                    const size = isDir ? '4096' : ' ' + String(Math.floor(Math.random() * 900 + 100))
                    output += `\n${prefix}  tameem staff  ${size} Jun 10 ${child}`
                })
                return output
            }

            if (args[0] === '-a') {
                return '.  ..  ' + dir.children.join('  ')
            }

            return dir.children.filter(c => !c.startsWith('.')).join('  ')
        },

        cd: (args) => {
            if (!args[0] || args[0] === '~') {
                setCurrentDir('~')
                return ''
            }
            if (args[0] === '..') {
                if (currentDir === '~') return ''
                const parts = currentDir.split('/')
                parts.pop()
                const newDir = parts.join('/') || '~'
                setCurrentDir(newDir)
                return ''
            }
            if (args[0] === '-') {
                return ''
            }

            const target = resolvePath(args[0])

            if (fileSystem[target]) {
                setCurrentDir(target)
                return ''
            }

            const fullPath = currentDir === '~' ? '~/' + args[0] : currentDir + '/' + args[0]
            if (fileSystem[fullPath]) {
                setCurrentDir(fullPath)
                return ''
            }

            return 'cd: no such file or directory: ' + args[0]
        },

        cat: (args) => {
            if (!args[0]) return 'usage: cat <filename>'

            const fullPath = currentDir === '~' ? args[0] : currentDir + '/' + args[0]

            if (fileContents[fullPath]) return fileContents[fullPath]
            if (fileContents[args[0]]) return fileContents[args[0]]

            const dir = fileSystem[currentDir]
            if (dir && dir.children.includes(args[0])) {
                const tryPath = (currentDir === '~' ? '~/' : currentDir + '/') + args[0]
                if (fileContents[tryPath]) return fileContents[tryPath]
                if (fileSystem[tryPath]) return args[0] + ': Is a directory'
                return `# ${args[0]}\n[File contents not available in demo]`
            }

            return 'cat: ' + args[0] + ': No such file or directory'
        },

        pwd: () => currentDir === '~' ? '/Users/tameem/portfolio' : '/Users/tameem/portfolio' + currentDir.substring(1),

        mkdir: (args) => {
            if (!args[0]) return 'usage: mkdir <dirname>'
            return 'mkdir: permission denied (read-only portfolio 😅)'
        },

        touch: (args) => {
            if (!args[0]) return 'usage: touch <filename>'
            return 'touch: permission denied (read-only portfolio 😅)'
        },

        rm: (args) => {
            if (!args[0]) return 'usage: rm <filename>'
            return 'rm: permission denied. Nice try though 🦆'
        },

        mv: (args) => {
            if (args.length < 2) return 'usage: mv <source> <dest>'
            return 'mv: permission denied (my files stay where they are 😤)'
        },

        cp: (args) => {
            if (args.length < 2) return 'usage: cp <source> <dest>'
            return 'cp: permission denied (flattered you want a copy though)'
        },

        grep: (args) => {
            if (!args[0]) return 'usage: grep <pattern> <file>'
            if (args[0] === 'talent' || args[0] === 'skill') return 'Match found in: tameem_akhtar.exe ✅'
            if (args[0] === 'bug') return 'No matches found. Code is clean 😎'
            return `grep: searching for "${args[0]}"...\nTry: grep talent`
        },

        head: (args) => {
            if (!args[0]) return 'usage: head <filename>'
            const content = fileContents[args[0]] || fileContents[currentDir + '/' + args[0]]
            if (content) return content.split('\n').slice(0, 3).join('\n')
            return 'head: ' + args[0] + ': No such file'
        },

        tree: () => {
            return `~/portfolio
├── README.md
├── resume.pdf
├── projects/
│   ├── portfolio/
│   │   ├── index.jsx
│   │   ├── package.json
│   │   └── README.md
│   ├── ecommerce/
│   │   ├── server.js
│   │   ├── routes.js
│   │   └── README.md
│   ├── chatapp/
│   │   ├── app.js
│   │   └── socket.js
│   ├── taskflow/
│   │   └── README.md
│   └── dashboard/
│       ├── App.jsx
│       └── README.md
├── skills/
│   ├── frontend.txt
│   ├── backend.txt
│   └── devops.txt
├── .secret
└── .hire-me

6 directories, 17 files`
        },

        whoami: () => 'visitor (definitely a recruiter with great taste)',
        hostname: () => 'tameems-macbook-pro.local',
        uname: (args) => {
            if (args[0] === '-a') return 'Portfolio 2.0.0 tameems-macbook-pro x86_64 React/Vite'
            return 'Portfolio'
        },
        date: () => new Date().toString(),
        echo: (args) => args.join(' ') || '',

        which: (args) => {
            if (!args[0]) return 'usage: which <command>'
            if (commands[args[0]]) return '/usr/local/bin/' + args[0]
            return args[0] + ' not found'
        },

        man: (args) => {
            if (!args[0]) return 'What manual page do you want?\nusage: man <command>'
            if (args[0] === 'hire-me') return `HIRE-ME(1)     Portfolio Manual     HIRE-ME(1)\n\nNAME\n    hire-me - initiate hiring of Tameem Akhtar\n\nDESCRIPTION\n    Displays reasons to hire. Side effects:\n    increased productivity, better code, chai breaks.\n\nSEE ALSO\n    about(1), skills(1), contact(1)`
            return `No manual entry for ${args[0]}\nTry: man hire-me`
        },

        top: () => `PID   COMMAND      CPU%   MEM%
001   react        12.3   45.2
002   node         8.7    32.1
003   vscode       15.4   52.8
004   chrome       45.2   78.9  ← as expected 😅
005   spotify      2.1    8.4
006   chai-maker   99.9   1.0   ← essential process ☕`,

        open: (args) => {
            if (!args[0]) return 'usage: open <url/file>'
            if (args[0] === '.') return 'Opening current directory in Finder... jk this is a browser 😄'
            return 'open: ' + args[0]
        },

        sudo: (args) => {
            const input = args.join(' ')
            if (input.includes('rm -rf')) return 'Nice try. Portfolio is delete-proof 🦆'
            if (input.includes('hire')) return '✅ Hiring initiated!\nSend offer to: tameemakhtar@example.com\nPhone: +91 9765587427'
            if (input.includes('make me a sandwich')) return '🥪 Okay.'
            return 'Password: ****\nAccess denied. Type hire-me for access 😉'
        },

        ping: () => `PING tameem@portfolio (127.0.0.1)
64 bytes: seq=0 time=0.04ms ✅
64 bytes: seq=1 time=0.03ms ✅
64 bytes: seq=2 time=0.04ms ✅
Status: 🟢 Available and ready to work
📍 Location: Kamptee, Nagpur`,

        neofetch: () => `    .:'           tameem@portfolio
   ___:____       ─────────────────
 ,'        '.     OS     Portfolio v2.0
 |  O    O  |     Host   Kamptee, Nagpur
 '.  ____  .'     Shell  custom-terminal
   '._  _.'      Theme  Dark Mode 🌙
      ||          Uptime ${new Date().getFullYear() - 2018}yrs
                  Chai   ███████████████ 99%
                  Bugs   ░░░░░░░░░░░░░░░  0%`,

        joke: () => {
            const jokes = [
                'Why do programmers prefer dark mode?\nBecause light attracts bugs 🐛',
                'A SQL query walks into a bar, sees two tables...\n"Can I JOIN you?" 🍺',
                '!false — funny because it\'s true 😄',
                '["hip","hip"] — hip hip array! 🎉',
                'How many programmers to change a bulb?\nNone. Hardware problem 💡',
                'Why do Java devs wear glasses?\nBecause they can\'t C# 👓',
                'A programmer\'s wife: "Get milk. If they have eggs, get 12."\nHe came back with 12 milks 🥛',
            ]
            return jokes[Math.floor(Math.random() * jokes.length)]
        },

        quote: () => {
            const quotes = [
                '"Talk is cheap. Show me the code." — Linus Torvalds',
                '"First, solve the problem. Then, write the code." — John Johnson',
                '"Make it work, make it right, make it fast." — Kent Beck',
                '"Simplicity is the soul of efficiency." — Austin Freeman',
                '"Any fool can write code a computer can understand. Good programmers write code humans understand." — Martin Fowler',
            ]
            return quotes[Math.floor(Math.random() * quotes.length)]
        },

        matrix: () => `01010100 01100001 01101101 01100101 01100101 01101101

Wake up, recruiter...
The Matrix has you...

💊 Blue pill → Close this tab
💊 Red pill  → Type 'hire-me'

Decoded: "Tameem"`,

        weather: () => `Kamptee, Nagpur 🇮🇳
☀️  34°C / 93°F · Humidity: 45%
Perfect weather for indoor coding with chai ☕💻`,

        history: () => `2018 ── 🌱 First "Hello World"
2019 ── 📚 JavaScript & React
2020 ── 💼 First dev job
2021 ── 🚀 Full-stack with Node.js
2022 ── 📈 Senior Developer
2023 ── ☁️  Cloud & DevOps
2024 ── 🔥 Built this terminal
NOW  ── 🎯 Your company? 😏`,

        secret: () => `I code best after midnight 🌙
Lo-fi is my IDE soundtrack 🎵
Sir Debugs-a-Lot is my rubber duck 🦆
Chai > Coffee, don't @ me ☕
Try 'ls -la' and 'cat .hire-me'`,

        'hire-me': () => `WHY HIRE TAMEEM?
─────────────────────────────
1. I solve problems, not just write code
2. New framework? Give me a weekend
3. I built a terminal portfolio
4. I ship on time, every time
5. I mass-debug at 2 AM without complaining

📧 tameemakhtar@example.com
📱 +91 9765587427
📍 Kamptee, Nagpur

Let's build something great.`,

        exit: () => `👋 Leaving so soon?

📧 akhtartamimm@example.com
📱 +91 9765587427

(Terminal can't actually close itself 😄)`,

        clear: () => '__CLEAR__',
    }

    const getPrompt = () => {
        const dir = currentDir === '~' ? '~' : currentDir.split('/').pop()
        return `tameem@portfolio:${dir}$ `
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = input.trim()
        if (!trimmed) return

        setCmdHistory(prev => [...prev, trimmed])
        setHistIndex(-1)

        const parts = trimmed.split(' ')
        const cmd = parts[0].toLowerCase()
        const args = parts.slice(1)

        if (cmd === 'clear') {
            setHistory([])
            setInput('')
            return
        }

        const newHistory = [...history, { type: 'input', text: trimmed, prompt: getPrompt() }]

        if (commands[cmd]) {
            const result = commands[cmd](args)
            if (result) {
                newHistory.push({ type: 'output', text: result })
            }
        } else {
            newHistory.push({ type: 'output', text: 'zsh: command not found: ' + cmd })
        }

        setHistory(newHistory)
        setInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (!cmdHistory.length) return
            const idx = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1)
            setHistIndex(idx)
            setInput(cmdHistory[idx])
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (histIndex === -1) return
            const idx = histIndex + 1
            if (idx >= cmdHistory.length) {
                setHistIndex(-1)
                setInput('')
            } else {
                setHistIndex(idx)
                setInput(cmdHistory[idx])
            }
        }
        if (e.key === 'Tab') {
            e.preventDefault()
            const partial = input.trim().toLowerCase()
            const cmdMatch = Object.keys(commands).find(c => c.startsWith(partial))
            if (cmdMatch) {
                setInput(cmdMatch)
                return
            }
            const dir = fileSystem[currentDir]
            if (dir) {
                const parts = input.split(' ')
                const last = parts[parts.length - 1]
                const fileMatch = dir.children.find(f => f.startsWith(last))
                if (fileMatch) {
                    parts[parts.length - 1] = fileMatch
                    setInput(parts.join(' '))
                }
            }
        }
    }

    const welcomeMsg = `╔══════════════════════════════════════════╗
║   Welcome to Tameem's Portfolio CLI 🚀   ║
╚══════════════════════════════════════════╝

Type 'help' to see all commands.
Try: about · skills · projects · hire-me · cd projects`

    return (
    <MacWindow windowname={windowname} setwindow={setwindow}>
        <div
            className="cli-window"
            onClick={() => inputRef.current?.focus()}
        >
            <pre className="welcome-msg">
                {welcomeMsg}
            </pre>

            {history.map((item, i) => (
                <div key={i} className="output-line">
                    {item.type === 'input' ? (
                        <div className="input-line">
                            <span className="prompt">{item.prompt}</span>
                            <span className="cmd-text">{item.text}</span>
                        </div>
                    ) : (
                        <pre>{item.text}</pre>
                    )}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <span className="prompt">
                    {getPrompt()}
                </span>
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </form>
            <div ref={bottomRef} />
        </div>
    </MacWindow>
)
}

export default Cli