autocmd FileType javascript set formatprg=../node_modules/.bin/prettier\ --no-semi\ --single-quote
autocmd BufWritePre */bin/*.js Neoformat

" Use formatprg when available
let g:neoformat_try_formatprg = 1
" https://github.com/sbdchd/neoformat/issues/25
let g:neoformat_only_msg_on_error = 1
