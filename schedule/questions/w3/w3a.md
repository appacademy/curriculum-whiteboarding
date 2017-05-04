# Week 3

## Student A

Questions you will be asking:

### OOP – Jukebox

Design a musical jukebox using object-oriented principles.

Solution:

Here are some answers to questions the interviewee might ask:

#### Is the jukebox physical or virtual?

Assume the jukebox is virtual or computer-simulated.

#### Does the jukebox accept currency?

Assume the jukebox operates free of charge.

Here is the skeleton of a potential solution:

```ruby
class Jukebox
  attr_accessor :user
  attr_reader :current_track

  def initialize(player, user)
    @player = player
    @user = user
    @current_track = nil
  end
end

class Player
  attr_accessor :album, :playlist

  def initialize(album, playlist)
    @album = album
    @playlist = playlist
  end

  def play_track(track)
    # Begin playing...
  end
end

class Playlist
  def initialize
    @queue = []
  end

  def add_track(track)
    @queue.push(track)
  end

  def shift
    @queue.shift
  end
end

class Album
  # Information about the album
end

class Track
  # Information about the track, including album
end

class User
  # Information about the user.
end
```

### SQL – Employees

In a SQL db, you have two tables, an employees table and a departments
table. Employees belong to only one department. Write a SQL query that,
given a department name, finds all the employees in that department.

Solution:

```sql
SELECT
  employees.*
FROM
  employees e
JOIN
  departments d ON e.department_id = d.id
WHERE
  d.name = ?
```
