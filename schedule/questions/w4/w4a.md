# Week 4

## Student A

Below are the two questions that you will be asking student B.

### Routes

#### Prompt

What code would you have to write to generate the following routes?
Also, which controller actions will each route be matched to by default?

```
GET /cats
GET /cats/:id
GET /cats/new
POST /cats
GET /cats/:id/edit
PATCH /cats/:id
PUT /cats/:id
DELETE /cats/:id
GET /cats/:cat_id/tricks
POST /cats/:cat_id/tricks
DELETE /cats/:cat_id/tricks/:id
POST /cats/:cat_id/upvote
DELETE /cats/:cat_id/upvote
```

Solution:

This is the simplest way:

```ruby
Rails.application.routes.draw do
  resources :cats do
    resources :tricks, only: [:index, :create, :delete]
    resource :upvote, only: [:create, :destroy]
  end
end
```

If the interviewee uses the above code for their routes, they will be
mapped to the following controller actions.

```
GET /cats                          cats#index
GET /cats/:id                      cats#show
GET /cats/new                      cats#new
POST /cats                         cats#create
GET /cats/:id/edit                 cats#edit
PATCH /cats/:id                    cats#update
PUT /cats/:id                      cats#update
DELETE /cats/:id                   cats#destroy
GET /cats/:cat_id/tricks           tricks#index
POST /cats/:cat_id/tricks          tricks#create
DELETE /cats/:cat_id/tricks/:id    tricks#destroy
POST /cats/:cat_id/upvote          upvotes#create
DELETE /cats/:cat_id/upvote        upvotes#destroy
```

### Bad Code

#### Prompt

What is wrong with the following controller action, and how would you
improve it?

``` ruby
class CommentsController < ApplicationController
  def users_comments
    posts = Post.all
    comments = posts.map(&:comments).flatten
    @user_comments = comments.select do |comment|
      comment.author.username == params[:username]
    end
  end
end
```

#### Solution

There are a few problems here.

First and foremost is the N + 1 query. First we are fetching all posts,
then we are running the `comments` method on each post, which, in turn,
runs an additional query. So, for each post, we are running a query.

To fix that problem, we should `includes` the comments to keep them in
memory.

``` ruby
posts = Post.include(:comments).all
```

Additionally, for each comment, we are calling the `author` method,
which performs an additional look up! We should all `includes` that:

``` ruby
posts = Post.includes(comments: [:author]).all
```

Fixing the N + 1 query is great, but there's another general problem
with this. Why are we handling the logic of the query in Ruby? There are
essentially three requests that occur: one for the posts, and two to
include the comments and authors in memory. This looks like something
that could be delegated to SQL pretty easily with ActiveRecord.

Here's an answer that returns what we're looking for in one query:

``` ruby
class CommentsController < ApplicationController
  def users_comments
    username = params[:username]
    @user_comments = Comment.joins(:author)
                            .where({ author: { username: username }})
  end
end
```
