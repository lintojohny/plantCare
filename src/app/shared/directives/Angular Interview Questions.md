

# Angular Interview Questions


  - [Observable and a promise](#observable-and-a-promise)
  - [component and a directive](#component-and-a-directive)
 - [Zone](#zone)
 - [Pipe](#pipe)
 - [Providers & Injectors](#providers-&-injectors)
 - [forRoot/forChild](#forRoot/forChild) ??
 - [pure pipes](#pure-pipes)
 - [HTTP interceptor](#HTTP-interceptor)
 - [View encapsulation](#View-encapsulation)
 - [Mixins](#Mixins)
 - [Customize with CSS ::part](#Customize-with-CSS-::-part)
 - [RxJS](#RxJS)



### observable and a promise
JavaScript is a single-threaded, non-blocking, and asynchronous concurrent language. That means that JavaScript’s engine doesn’t sit and wait for statements to finish. Instead, it moves to the next statement

callbacks were the only available approach. However, they made the code hard to read, which lead to the well-known callback hell

Observables and Promises were born to precisely fix that problem. Their implementations help us deal with that asynchronous code in a cleaner way

#####1. One value vs. multiple values
#####2. Observable subscriptions are cancellable; promises aren’t
 -  unsubscribe: manually canceling the subscription from the Observable
 - take: an operator for taking a number X of elements and canceling the subscription
 - takeUntil: an operator that keeps on taking values until the passed Observable emits any value.

#####3. Eager vs. lazy execution

### component and a directive
  ##### Component
 ``` @Component({
    selector: "my-app"
    directives: [custom_directive_here]
})
 ```
- ##### Structural directives (*ngfor, *ngIf)
- ##### Attribute directives (ngClass, ngStyle, ngModel)
- custom directive 

``` 
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(private el: ElementRef) {
       this.el.nativeElement.style.backgroundColor = 'yellow';
    }
}
 ```
### Zone
 Zone.js provides a mechanism, called zones, for encapsulating and intercepting asynchronous activities in the browser

 These zones are execution contexts that allow Angular to track the start and completion of asynchronous activities and perform tasks as required (e.g. change detection)

 NgZone exposes a set of Observables that allow us to determine the current status, or stability, of Angular's zone.
onUnstable – Notifies when code has entered and is executing within the Angular zone.
onMicrotaskEmpty - Notifies when no more microtasks are queued for execution. Angular subscribes to this internally to signal that it should run change detection.
onStable – Notifies when the last onMicroTaskEmpty has run, implying that all tasks have completed and change detection has occurred.
onError – Notifies when an error has occurred. Angular subscribes to this internally to send uncaught errors to its own error handler, i.e. the errors you see in your console prefixed with 'EXCEPTION:'.
### Pipe
 ```
 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filesize' })
export class FileSizePipe implements PipeTransform {
  transform() {}
}

### {{ value | pipe:arg1:arg2 }}

 ```
### Providers & Injectors

Injectors are responsible of creating the objects to inject and injecting them in the components that request them. You tell injectors how to create these objects by declaring a provider. In the provider you can tell the injector to use a given value or use a class to instantiate for example.

Injected objects are always singletons inside an injector but you can have more than one injector in your project. They are created by Angular: A root injector is created in the bootstrap process and injectors are created for components, pipes or directives. Each lazy-loaded module also gets its own
### forRoot/forChild
### pure pipes
pure pipes are the pipes which are executed only when input value change is detected.

A pure change is either a change to a primitive input (string, number etc) value. or changed Object reference.

by default a pipe is pure pipe.

So impure pipe executes everytime irrespective of source has changed or not. which leads to bad performance. thats why it is not recommneded to use pipes for filtering data.


```
@Pipe({
  name: 'empFilter',
  pure: false  // default is set to true.
})
export class EmpFilterPipe implements PipeTransform {

  transform(employees: Employee[], searchValue?: string): Employee[] {
  
   }
}
 ```
### HTTP interceptor
HTTP request interceptor is a special kind of service that hooks into the request process and allows us to modify request data
Using the intercept() method we need to clone the original request, modify it, and then call next.handle() to pass the modified request
 ```
 @Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = 'secure-user-token';
    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq);
  }
}
 ```
### View encapsulation
 Angular, a component's styles can be encapsulated within the component's host element so that they don't affect the rest of the application.

The Component's decorator provides the encapsulation option which can be used to control how the encapsulation is applied on a per component basis
 - Emulated (default)
 - none 
 - shadoDom
### Mixins
The @mixin directive lets you create CSS code that is to be reused throughout the website.
The @include directive is created to let you use (include) the mixin.

```css

@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}
.danger {
  @include important-text;
  background-color: green;
}
A mixin can also include other mixins:

@mixin special-text {
  @include important-text;
  @include link;
  @include special-border;
}
Passing Variables to a Mixin
@mixin bordered($color, $width) {
  border: $width solid $color;
}

```
### Customize with CSS ::part

::after creates a pseudo-element that is the last child of the selected element. It is often used to add cosmetic content to an element with the content property. It is inline by default.

```html
<p class="boring-text">Here is some plain old boring text.</p>
<p>Here is some normal text that is neither boring nor exciting.</p>
<p class="exciting-text">Contributing to MDN is easy and fun.</p>
 ```
 ```css
 .exciting-text::after {
  content: " <- EXCITING!";
  color: green;
}

.boring-text::after {
  content: " <- BORING";
  color: red;
}
 ```
### Subject
A Subject is a particular type of Observable from the RxJS library
##### Unicast
An Observable is unicast. An Observer and its Subscriber have a one-to-one relationship. Each subscribed Observer owns an independent execution of the Observable.

##### Multicast
Subject allows values to be multicasted to many Observers. A Subject and its subscribers have a one-to-many relationship.

```ts 
Observable
const rxjs = require('rxjs');
const { Observable } = rxjs
 
const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
});
 
console.log('just before subscribe');

// Subscriber 1
observable.subscribe({
  next(x) { console.log('sub1: got value ' + x); },
  error(err) { console.error('sub1: something wrong occurred: ' + err); },
  complete() { console.log('sub1: done'); }
});

// Subscriber 2
observable.subscribe({
  next(x) { console.log('sub2: got value ' + x); },
  error(err) { console.error('sub2: something wrong occurred: ' + err); },
  complete() { console.log('sub2: done'); }
});

console.log('just after subscribe');;
 ```
 ```ts
 subject 
const rxjs = require('rxjs');
const { Subject } = rxjs

const subject = new Subject();
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(1);
subject.next(2);;
 ```
 ##### BehaviourSubject
 BehaviorSubject holds one value. When it is subscribed it emits the value immediately. A Subject doesn't hold a value.
 ``` ts
 subject
 const subject = new Rx.Subject();
subject.next(1);
subject.subscribe(x => console.log(x));

Console output will be empty



behavioral subject
const subject = new Rx.BehaviorSubject(0);
subject.next(1);
subject.subscribe(x => console.log(x));

Console output: 1

 ```
BehaviorSubject should be created with an initial value: new Rx.BehaviorSubject(1)
##### ReplaySubject
``` ts
const subject = new ReplaySubject(2); // buffer 3 values for new subscribers
 ```


# unit test?


### What would you not put in a shared module
I would not put services in a shared module which may be imported by a lazy loaded module. When a lazy loaded module imports a module which provide a service, angular will create another instance of this service which may result in unexpected behaviors


### async validation
```
email: [
        "",
        [Validators.required, Validators.email],
        [this.emailValidator.existingEmailValidator()]
      ]



return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this.userService
              .getByEmail(control.value)
              .pipe(
                map(user =>
                  user ? { existingEmail: { value: control.value } } : null
                )
              )
          )

 ```
### export from ngModule
 It enables an Angular module to expose some of its components/directives/pipes to the other modules in the applications. Without it, the components/directives/pipes defined in a module could only be used in that module



   ### ActivatedRoute
   Provides access to information about a route associated with a component that is loaded in an outlet
   ```
   class ActivatedRoute {
  snapshot: ActivatedRouteSnapshot
  url: Observable<UrlSegment[]>
  params: Observable<Params>
  queryParams: Observable<Params>
  fragment: Observable<string | null>
  data: Observable<Data>
  outlet: string
  component: Type<any> | null
  routeConfig: Route | null
  root: ActivatedRoute
  parent: ActivatedRoute | null
  firstChild: ActivatedRoute | null
  children: ActivatedRoute[]
  pathFromRoot: ActivatedRoute[]
  paramMap: Observable<ParamMap>
  queryParamMap: Observable<ParamMap>
  toString(): string
}
 ```
### RouterState
RouterState is an interface which represents the state of the router as a tree of activated routes

### ng-template
ng-template directive represents an Angular template: this means that the content of this tag will contain part of a template, that can be then be composed together with other templates in order to form the final component template.

Angular is already using ng-template under the hood in many of the structural directives that we use all the time: ngIf, ngFor and ngSwitch


### Performance and Edge case Related Terminology
1. What is a factory Component?
2. What is lazy loading and why will you use it?
3. What is Ahead of time (AOT) compilation and why will you use it?
4. What are some of the Angular Style Guide suggestions you follow on your code? Why?
5. What is wildcard state?
6. How do you put animation between two states?
7. What would be a good use for NgZone service?
8. How would you protect a component being activated through the router?
9. How would you insert an embedded view from a prepared TemplateRef?
10. What is attribute directive and why will you use it?

### Master a Large App
1. How will you intercept http to inject header to each http call?
2. How would you create a component to display error messages throughout your application?
3. How will you parallelize multiple observable call?
4. How will you put one async call before another?
5. How can you use web worker in angular app?
6. What tools would you use to find a performance issue in your code?
7. What are some ways you may improve your website's scrolling performance?
8. Explain the difference between layout, painting and compositing.
9. How can you cancel a router navigation?
10. How would you animate routing?
11. How would you cancel a promise on which you are waiting?


### Rockstar and Fighter for Angular Questions
1. When does a lazy loaded module is loaded?
2. Why angular uses url segment?
3. How will you make angular app secure?
4. How will you localize numbers currencies and dates?
5. What is the best way to use translation in your app?
6. How will you setup different environment build differently for your app?
7. How will you use scss or css preprocessing with your application?
8. How will you optimize image/svg in your angular app?
9. How would you make sure an api call that needs to be called only once but with multiple conditions? Example: if you need to get some data in multiple routes but, once you get it, you can reuse it in the routes that needs it, therefor no need to make another call to your backend apis.
10. If you need to respond to two different Observable/Subject with one callback function, how would you do it? (ex: if you need to change the url through route parameters and with prev/next buttons).




[Answers link coming soon]

## Coding Test
Sometimes interviewer gives real coding test. Most of us suck on those and feel ashamed of ourselves and then continue to work in the current job. I don't want you to saty in that miserable job. Hence, take the following coding challenges and master them. 

### Fetch Data and Display User Profile

This test has three level
1. Level 1: I am giving you an api https://api.github.com/search/users?q=eric This api takes a query parameter name "q" and passes query string to server. Server returns bunch of users. Now I want you to create a input text box and button so that you can type anything on the text box and hit on the button to retrieve data from the given api. Upon retrieval display total_count and first 10 users in the search result. Detail instruction about this test is available [here](https://github.com/khan4019/github-profile-search)
2. Level 2: Convert each user profile as a router link so that upon clicking on each user profile you will navigate to a route that has "login" property in the route. Pass user.login as route parameter. Create a separate component where you will read the route parameter and then fetch data for that user  by using this api https://api.github.com/users/eric . Please Notice that last part of this api is the user.login (the route parameter that you have passed). Finally display user image and few other information in the component
3. Level 3: use any charting framework that you can find and then create a simple bar chart to display number of followers of first 10 users


This coding test will judge your ability to use services, component, routing, data visualization, external module, observables, etc.

[Sample code link coming soon] 

### Persistent Todo List
This test has three levels
1. Level 1:  Implement a simple todo list where you can add items, mark as done
2. Level 2: Now create few categories of todo list and make it persistence in the browser
3. Level 3: Now use firebase (serverless database) to make todo list persistence across multiple devices

This coding test will judge whether you can pass data and events between components. Also, whether you are leveraging directives and understand difference between component and directives.


[Sample code link coming soon]

### Student Registration System
This test has three levels
1. Level-1: Design a system where students can login to register different courses 
2. Level-2: Add a feature so that faculties on each course can view how many students registered on the courses
3. Level-3: (I need a shower. will add text here after I clean up myself) 

This coding test will judge your understanding of architecture for a large application. Your ability to think and implement module, lazy loading, asset management etc.

[Sample code link coming soon]

## Side Things Related Questions

### rxjs
3. Why unsubscribing is important?
1. What is the difference between map and flatmap?
2. Whare are the different ways you can create an Observable?
4. What is forkJoin, zip, share?
5. Difference between hot and cold observables.

### TypeScript
1. How would you debug a typescript file?
2. How do you implement interface in typescript?
3. How would you call base class constructor from child class in typescript?
4. What is typescript language service?
5. How to declare a custom type?
6. what are some disadvantages of typescirpt? answers [here](https://www.codeproject.com/Articles/1071285/Latest-TypeScript-Interview-Questions-for-Beginner) 

### angular-cli
1. Why would you use angular cli?
2. How would you run unit test? 
3. How do you create application to use scss?
4. How to inject base href?
5. How would you extract webpack config from angular cli project?


### Others
1. What is the use of codelyzer?
2. Will you use Angular Material2?
4. How would you set different config in different deployment server?
5. What do you know about ES6?
6. What is ngUpgrage? Do you know how you can run angularJS and angular side by side?

[Answers link coming soon]


## Note from God
On a press release, God expressed HIS apologies to send the author of this repo to a non-English speaking country and creating weekends. 




## Contributors
* [That JS Dude](https://github.com/khan4019)
* [Jesse M. Holmes](https://github.com/wolfhoundjesse)
* And you?
___________


Few questions are inspired by [Yonet](https://github.com/Yonet/Angular-Interview-Questions), [codeProject](https://www.codeproject.com/Articles/1169073/Angular-Interview-Questions)


^\s*+Kindly match your.*\s?+$