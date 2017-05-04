# Week 2

## Student A

Below are the two questions that you will be asking student B.

### Recursive Sum

#### Prompt

Write a function that takes an array of integers and returns their sum.
Use recursion.

#### Solution

```ruby
def sum_rec(nums)
  return 0 if nums.empty?
  nums[0] + sum_rec(nums.drop(1))
end
```

### Ruby – Contrast and Compare

#### Prompt

Ruby is a dynamic, reflective language that lends itself to
object-oriented programming. What are some benefits and drawbacks of
dynamic languages? What are some benefits and drawbacks of reflection
and object-oriented programming?

#### Solution

This question has a wide variety of potential answers.

Some benefits of dynamic languages:

* Allows for execution of code at compile time
* Potentially more abstraction and less code
* Dynamic typing allows for flexibility

Some drawbacks of dynamic languages:

* Dynamic typing means that errors are often encountered at run time
* Run time evaluation decreases execution speed

Some benefits of reflection:

* It allows for much of metaprogramming
* Create custom methods on the fly

Some drawback of reflection:

* Code can be very confusing/hard to reason about

Some benefits of object-oriented programming:

* Inheritance lends itself to easy reusability of code
* Encapsulation offers a system for organization of code
* Information hiding ensures that objects have enough information to
perform what they need to do without making that information public to
external objects

Some drawbacks of object-oriented programming:

* The preference for data over functions can result in more code
* Polymorphism and inheritance can make it difficult to determine what
the result of a method call will be
* Reliance on side effects can make it difficult to reason about the
correctness of code (to work out correctly, methods might need to be
called in a certain order or objects might need to be in some certain
state)
