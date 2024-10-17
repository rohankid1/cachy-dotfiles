source /usr/share/cachyos-fish-config/cachyos-config.fish

function fish_greeting
    pfetch
end

# bun
set --export BUN_INSTALL "$HOME/.bun"
set --export PATH $BUN_INSTALL/bin $PATH

set --export PATH /home/rohan/.cargo/bin $PATH
set --export PATH /home/rohan/go/bin $PATH

zoxide init fish | source
cat ~/.cache/wal/sequences

alias .. 'z ..'
alias ... 'z ../..'
alias bat 'bat --theme='\''Visual Studio Dark+'\'''
alias free 'free -h --si'
alias icat 'kitten icat'
alias ls 'eza -la --icons --color=always --smart-group --group-directories-first'
alias hx helix

starship init fish | source
