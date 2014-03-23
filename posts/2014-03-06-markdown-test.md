---
layout: post.hbs
post: true

title:  "Mardown test"
subtitle: "a sample page to test Markdown styling"
date:   2014-03-06 15:10:00
categories: test
---

This page is a demo of markdown rendering.

<!--more-->

------

It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com).


Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this

------

If you want to embed images, this is how you do it:

![Don Quixote by Honoré Daumier](http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Honor%C3%A9_Daumier_017_%28Don_Quixote%29.jpg/416px-Honor%C3%A9_Daumier_017_%28Don_Quixote%29.jpg)

------

Sometimes it's useful to have different levels of headings to structure your documents. Start lines with a `#` to create headings. Multiple `##` in a row denote smaller heading sizes.

# The largest heading (an <h1> tag)

## The second largest heading (an <h2> tag)

### The third largest heading (an <h3> tag)

#### The fourth largest heading (an <h4> tag)

##### The fifth largest heading (an <h5> tag)

###### The sixth largest heading (an <h6> tag)

------

If you'd like to quote someone, use the > character before the line:

> "Take care, your worship, those things over there are not giants but windmills."
> - Miguel de Cervantes

------

To use syntax highlighting, use fenced codeblocks and include the language:

A few lines of ruby:

```ruby
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
```

and a Fibonacci function in Python:

```python
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()
```

------

Here is how you can create tables (second line is used to specify text alignment):

First Header | Second Header | Third Header
:----------- | :-----------: | -----------:
Content from cell 1 | Content from cell 2 | Cell 3
Content in the first column | Content in the second column | Content in the third column

