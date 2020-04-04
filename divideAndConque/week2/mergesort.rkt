#lang racket
;merge sort
(define (merge-sort xs)
  (letrec([xs-length (length xs)])
    (cond[(= 1 xs-length) xs]
          [#t (letrec([half (ceiling (/ xs-length 2))]
                      [left (take xs half)]
                      [right (list-tail xs half)])
                (merge-list (merge-sort left)(merge-sort right)))])))


(define (merge-list xs ys)
  (cond [(null? xs) ys]
        [(null? ys) xs]
        [(< (car xs) (car ys))
         (cons (car xs) (merge-list (cdr xs) ys))]
        [#t (cons (car ys) (merge-list xs (cdr ys)))]))


