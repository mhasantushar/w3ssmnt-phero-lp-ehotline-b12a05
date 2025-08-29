<h1>My response to Assignment Questions</h1>

<h2>[Q1] Difference among getElementById, getElementsByClassName, and querySelector/querySelectorAll</h2>

<h3>getElementById(param)</h3>
It returns a single DOM object, whose <strong>id</strong> is the same as the param value. Returns a null if no match is found. It is usually used to target a simple button.

<h3>getElementsByClassName(param)</h3>
It returns an HTML collection holding single/multiple objects, each having a <strong>class</strong> attribute value that matches the param. We will deploy a loop through the collection to add an event listener to each object. This method is very handy to target a number of elements in one go. It returns an empty array if no match is found.

<h3>querySelector(param) || querySelectorAll(param)</h3>
In contrast to the above method, these two methods catch element(s) by matching <strong>CSS selector</strong>, as specified in the param. querySelector returns the first match, whereas querySelectorAll returns all matches as a node list. They return a null and an empty collection, respectively, if no match is found at all.

<h2>[Q2] Creating and inserting a new element into the DOM</h2>

As the question hints, there are two steps: 1) creating the object and 2) linking/inserting the same to an existing element. We can, however, optionally assign a value to the new object between the two aforementioned steps. Example below:

<pre>
<code>
  const newElement = document.createElement("div");  //creating a new instance of div element
  parentElement.appendChild(newElement);             //taging with it's container element
</code>
</pre>

As mentioned above, we could insert more instructions to add contents/attributes, to assign id/classname, etc just after the first line.

<h2>[Q3] What Event Bubbling is and how it works</h2>

An event in JS is first fired in the source, and then propagates up through the DOM tree, triggering event handlers of all its ancestors (from its parent to the topmost level) unless it is stopped explicitly. This is called Event Bubbling.

For example, consider a DOM hierarchy that has a button at its 5th level - body > main > section > div > button. If a user clicks on the button, just one "click" event should be fired for the button. But in JS, we will have four additional events triggered in div, section, main, and body levels due to event bubbling.

<h3>Event bubbling works in 3 phases</h3>
<ol>
  <li>
    <strong>Finding down the source: </strong>Once an event occurs, JS starts from the top and dives down through each branch of the tree, checking each node if it is associated with that event.
  </li>
  <li>
    <strong>Firing actual trigger: </strong>Upon finding the association, it triggers that element's event handler. These are the actual source and actual trigger, we can say.
  </li>
  <li>
    <strong>Bubbling up propagating: </strong>JS now rises through the tree, triggering the event handler of each node on its way up. However, note that the actual element, found in step 2, is always pointed to as the source of the event throughout this series of triggers.
  </li>
</ol>

<h2>[Q4] What Event Delegation is and why this is useful</h2>

We can add an event listener to a parent element in JS that can handle all of its children's events utilizing JS' Event Bubbling behaviour. This is called Event Delegation.

Consider an online shop offering a hundred thousand products listed on its page. Each product has an "Add to Cart" button. So, instead of writing an event listener for each button, we can easily put the same code on their parent, minimizing our coding effort drastically.

<h3>How Event Delegation is Useful</h3>

As mentioned above, using the delegation technique, we can reduce the number of event listeners from thousands to a few. This results in significant improvements in -
<ul>
  <li>decreasing browser load in terms of memory used and processing power required, and thus achieving better performance efficiency</li>
  <li>slaing up, as it will be working seamlessly with elements dynamically afterwards during runtime</li>
  <li>cleanness, readability, and manageability of the codebase, reducing operational efforts</li>
</ul>

<h2>[Q5] Difference between preventDefault() and stopPropagation() methods</h2>

<h3>preventDefault()</h3>

This method is used to stop an element's default action. For example, an a element's default behaviour is opening the specified page. We can stop these default actions by using this method.

A practical use case of this method is to temporarily halt a form element's default submission action upon clicking the submit button, to run various validation checks before the form submits its data to the server and reloads the page.

<h3>stopPropagation()</h3>

This method is used to stop JS' Event Bubbling behaviour. For example, if we use this method in a button's event handler routine, it will prohibit triggering event handlers of that button's parents and other ancestors throughout the DOM tree. 

A classic use case scenario could be an online shop's site, where items are grouped into multiple categories and subcategories. We won't want a click on a subcategory item's button to bubble up to the category level, messing with items associated with that category. Therefore, we need to use this method right in the subcategory level.

