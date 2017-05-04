# Week 4

## Student B

1. Our company needs an internal web application where employees can be
associated with multiple projects and projects can be associated with
multiple employees. How would you design the schema and models for this
application?

Include your database and model validations. What validations should you
include?

(Feel free to use "User" for the employee model and "users" for the
employees table in the database.)

Solution:

The key here is that users have a one-to-many relationship with projects
and projects have a one-to-many relationship with users. This should
signal to the interviewee that a join table will be needed. There are
several names that could be used for this join table.

For the validations, the interviewee ideally will think to prevent a
case where a single user has multiple records for the same project. A
user should only be able to be assigned to a project once. For this,
they will need to validate for uniqueness on the combination of the
`user_id` and `project_id`.

Assuming that we choose to name the join table "assignments", the schema
could look as follows. Note that they would not necessarily need to use
the same `schema.rb` format.

``` ruby
create_table "users", force: true do |t|
  t.string   "name", null: false
  # ... Other Info ...
  t.datetime "created_at"
  t.datetime "updated_at"
end


create_table "assignments", force: true do |t|
  t.integer  "user_id", null: false
  t.integer  "project_id", null: false
  t.datetime "created_at"
  t.datetime "updated_at"
end

add_index "assignments", ["user_id"], name: "index_assignments_on_user_id"
add_index "assignments", ["project_id"], name: "index_assignments_on_project_id"
add_index "assignments", ["user_id", "project_id"], name: "index_assignments_on_user_id_and_project_id", unique: true

create_table "projects", force: true do |t|
  t.string   "name", null: false
  # ... Other Info ...
  t.datetime "created_at"
  t.datetime "updated_at"
end
```

The models could look as follows:

``` ruby
class User < ActiveRecord::Base
  validates :name, presence: true

  has_many :assignments,
           primary_key: :id,
           foreign_key: :user_id,
           class_name: :Assignment

  has_many :assigned_projects,
           through: :assignments,
           source: :project
end

class Assignment < ActiveRecord::Base
  validates :user, :project, presence: true
  validates :user, uniqueness: { scope: :project }

  belongs_to :user,
             primary_key: :id,
             foreign_key: :user_id,
             class_name: :User

  belongs_to :project,
             primary_key: :id,
             foreign_key: :project_id,
             class_name: :Project
end

class Project < ActiveRecord::Base
  validates :name, presence: true

  has_many :assignments,
           primary_key: :id,
           foreign_key: :project_id,
           class_name: :Assignment

  has_many :assignees,
           through: :assignments,
           source: :user
end
```

2. Describe a method for providing user authentication through session
tokens.

Solution:

A solution to this prompt should touch on the following:

* Session token generation
  * Random
  * Unique
    * What happens if SecureRandom happens to generate the same string
      twice for two different users in the database?
  * When to reset a user's session token
    * Logout
* Passwords
  * Do NOT store in database
  * Salt
    * Reason
      * Raise the cost of cracking a password to deter malicious
        behavior
    * BCrypt
      * How the comparison with the hashed password works
* Passing the session token through cookies
  * Use of `session[:session_token]`
