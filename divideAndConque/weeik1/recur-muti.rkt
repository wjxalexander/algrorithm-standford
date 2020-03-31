#lang racket

(define (get-length x)
  (letrec([help (lambda (x y)
                  (if (< x 1)
                      y
                      (help (/ x 10)(+ y 1))))])
    (help (/ x 10) 0)))
(define (recur-multi x y)
 ( if(or (<= 10 x) (<= 10 y))
     (* x y)
     (letrec([mi (if(< (get-length x) (get-length y))
                    (get-length x)
                    (get-length y))]
             [m1 (if(= (/ mi 2) 0)
                    (/ mi 2)
                    (/ (- mi 1) 2))]
             [m2 (- mi m1)]
             [a (quotient x (expt 10 m2))]
             [b (remainder x (expt 10 m2))]
             [c (quotient y (expt 10 m2))]
             [d (remainder y (expt 10 m2))]
             [ac (recur-multi a c)]
             [bd (recur-multi b d)]
             [gauss (recur-multi (+ a b) (+ c d))])
       ( + bd (+ (* ac (expt 10 (* 2 m2))) (*(- gauss ac bd) (expt 10 (* 2 m2))))))))
