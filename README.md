<div align="center">

# CODE BADGES

Hello developer... time to show off your progress and achievements!

[See codeBadges in action](https://codemzy.github.io/codebadges)

![alt text](/img/example/codebadges_example.png "[codeBadges examples")

</div>

### Get Started

#### CDN

```html
<!-- codeBadges minified CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/codemzy/codebadges@1.0.4/dist/codebadges.min.css">
<!-- codeBadges minified JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/codemzy/codebadges@1.0.4/dist/codebadges.min.js"></script>
```
__Important:__ codeBadges JS relies on jQuery JS, so you need to load jQuery JS before codeBadges JS

### Usage

#### HTML.
<b>Add a single badge...</b>
```html
<div class="code-badge freecodecamp"></div>
```
<b>Or a row of badges...</b>
```html
<div align="center">
  <div class="code-badge freecodecamp"></div>
  <div class="code-badge github"></div>
  <div class="code-badge codeschool"></div>
  <div class="code-badge codecademy"></div>
  <div class="code-badge treehouse"></div>
  <div class="code-badge codewars"></div>
</div>
```

#### JavaScript.
<b>Now activate your badges with one line of js...</b>
```js
codeBadges("codemzy").freecodecamp().github().codeschool().codecademy().treehouse("ryancarson").codewars();
```
Activate codeBadges with your main username `codeBadges("username")` and then chain on the badges you have in your html.
Got a different username for some platforms? No worries, just pass that username in to the platform, e.g. `.github("differentName")`.


### Customising

#### Small badges.

```html
<div class="code-badge badge-small freecodecamp"></div>
```
Just add the class `badge-small` to your badges to make them smaller.

#### Custom colours.
Got a strict colour scheme and want all your badges in pink? Who am I to judge?!

<b>Add your own classes...</b>
```css
.code-badge.pink-badge .outer {
  background-color: #DB0A5B;
}
```
In your own css, just add a code badge class for `.pink-badge` like the example above.

<b>Apply to your html...</b>
```html
<div class="code-badge freecodecamp pink-badge"></div>
```
        
### Badges

#### Available.

- codecademy
- codeschool
- codewars
- freecodecamp
- github
- treehouse

#### Requests.

Want a new badge adding? Send a request via the issues or submit a pull request.
Don't forget to include your username on the requested site so it can featured. The site must have public profiles so that the user info can be requested via an api or scraped from a public profile page.

### License

The MIT License (MIT)

Copyright (c) 2018 codemzy