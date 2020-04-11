#lang racket
(define (quick_sort arr)
  (cond[(null? arr) arr]
       [(= 1 (length arr)) arr]
       [#t (letrec([pivot (car arr)]
                   [todolist (cdr arr)]
                   [smaller_part (quick_sort(smaller_partion todolist pivot))]
                   [big_part (quick_sort(bigger_partion todolist pivot))])
             (append smaller_part (list pivot) big_part ))]))

(define (smaller_partion arr pivot)
  (cond[(null? arr) arr]
       [(< (car arr) pivot) (cons (car arr) (smaller_partion (cdr arr) pivot))]
       [#t (smaller_partion (cdr arr) pivot)]))


(define (bigger_partion arr pivot)
  (cond[(null? arr) arr]
       [(>= (car arr) pivot) (cons (car arr) (bigger_partion (cdr arr) pivot))]
       [#t (bigger_partion (cdr arr) pivot)]))