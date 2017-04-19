autocmd FileType javascript set formatprg=../node_modules/prettier_d/bin/prettier_dnc.sh\ --fallback\ --pkg-conf
autocmd BufWritePre,TextChanged,InsertLeave */bin/*.js Neoformat

" Use formatprg when available
let g:neoformat_try_formatprg = 1
" https://github.com/sbdchd/neoformat/issues/25
let g:neoformat_only_msg_on_error = 1
