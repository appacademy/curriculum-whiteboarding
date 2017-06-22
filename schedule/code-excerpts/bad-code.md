# Bad Code

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
