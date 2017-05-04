# Week 2

## Student B

Below are the two questions that you will be asking student A.

### Fibonacci – Two Ways

#### Prompt

Write a method, fibs(num) which returns the first n elements from the
Fibonacci sequence, given n.

Solve it both iteratively and recursively.

#### Solution

Iterative Solution:

```ruby
def fibs(num)
  return [] if num == 0
  return [0] if num == 1

  fibs = [0, 1]
  while fibs.count < num
    fibs << fibs[-1] + fibs[-2]
  end

  fibs
end
```

Recursive Solution:

```ruby
def fibs(num)
  return [] if num == 0
  return [0] if num == 1
  return [0, 1] if num == 2

  prev_fibs = fibs(num - 1)
  prev_fibs << prev_fibs[-1]  + prev_fibs[-2]

  prev_fibs
end
```

### Agile

#### Prompt

Define "Test-Driven Development" and "Continuous Integration". Also,
what are their benefits?

#### Solution

Test-Driven Development follows the pattern of writing tests first,
watching them fail, writing the code to make them pass, and then
watching the tests pass.

Continuous Integration is the practice of integrating newly developed
code back into a main branch multiple times a day.

A benefit of Test-Driven Development is that it allows for clear
expectations of the code to be written. Another benefit is that it
allows for safer refactoring. After refactoring, a developer can be much
more certain that the refactoring did not introduce any bugs.

A benefit of Continuous Integration is that it prevents the need to
reconcile massive merge conflicts, which can be fairly common if
multiple developers work on multiple feature branches simultaneously.
