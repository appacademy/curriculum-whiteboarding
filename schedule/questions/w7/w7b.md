# Week 7

## Student B

Below are the two questions that you will be asking student A.

### Redux

#### Prompt

I want a simple social media app that will store posts.
I would like you to use Redux to store the front-end state.
Each post should have a body, title, and id.
Users should be able to post new posts.
They should also be able to delete old posts and edit existing posts.
Please describe how you would store and work with posts on the front-end
using Redux. In particular,

* Describe the Redux state shape you would implement
* Describe the reducers and action creators you would use

#### Solution

The state should look something like this:

```js
{
  todos {
    1 {
      id: 1,
      title: 'A Post',
      body: 'It\'s body'
    },
    2 {
      id: 2,
      title: 'Another Post',
      body: 'It also has a body'
    },
  }
}
```
In particular, the posts should be stored in an object nested under its
Id. They should not be stored in an array (because we will want constant
time lookup).

The action creators should look something like this:

```js
export const ReceivePosts = posts => ({
  type RECEIVE_POSTS,
  posts
});

export const ReceivePost = post => ({
  type RECEIVE_POST,
  post
});

// This action creator should NOT take post as an argument
// The id is enough to identify the post to be deleted, and we always
// want our actions to cary the smallest possible payload
export const DeletePost = id => ({
  type DELETE_POST,
  id
});
```

We will only need one reducer.
The following reducer would work with the above actions:

```js
// It is important to remember the default state, in this case: {}
export default function(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      // Make sure the post is nested under its Id before merging with state
      return Object.assign({}, state, { [action.post.id]: action.post });
    case DELETE_POST:
      let newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}
```

### React – Virtual DOM

#### Prompt

What is React’s virtual DOM and why is it used?  How does the diffing
algorithm work?

#### Solution

The virtual DOM is a simpler and faster abstraction of the HTML DOM.
While it might be more expensive to manage two DOMs in some respects,
being able to traverse and perform operations on the virtual DOM saves
React from having to have costly interactions with the real one, only
updating it when it absolutely needs to.

When rendering, React creates a tree of React elements. When state or
props update, React then renders a tree of potentially different
elements. The diffing algorithm figures out how to efficiently update
the DOM, removing old DOM nodes and replacing them only when necessary.
We give unique HTML elements unique IDs so the diffing algorithm can
tell them apart.

This algorithm solves the problem of generating the fewest number of
operations needed to manage re-rendering. The React diffing algorithm
manages to run in O(n) time (where n is the number of HTML elements)
using a series of rules to determine when a node will need to be
updated.
