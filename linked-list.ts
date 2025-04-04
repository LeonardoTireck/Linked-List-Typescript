// to create a linked list, first we need a class to define the list itself
class LinkedList<T> {
  // the class should have three properties
  private root?: NodeElement<T>; // the root points at the first element of the list
  private tail?: NodeElement<T>; // the tail points at the last element of the list
  private length: number = 0; // the length is the size of the list
  // it also needs a method for adding new nodes to the list
  add(value: T) {
    const node = new NodeElement(value); // to add a node to the list with the add method we begin by instantiating a new NodeElement object
    // we now need to check if the root or tail elements already exist, and if they dont we assign the new node to be the root and the tail
    if (!this.tail || !this.root) {
      this.root = node;
      this.tail = node;
    } else {
      // now if they do exist, we assign the "next" property of the tail element to be the node we just created.
      this.tail.next = node;
      // after that, we assign the newly created node as the new tail
      this.tail = node;
    }
    // after finishing the operation, the last thing we need to do is to increase the length property of the list.
    this.length++;
  }

  // now we can also add some other features like showing the length of the list, printing all of its elements, removing elements...
  // i decided to use a getter for this one because i dont want to be able to change the length property directly from outside the class
  get numberOfElements() {
    return this.length;
  }

  // this function is just a loop that logs every element on the list
  getAllElements() {
    if (!this.root) {
      console.log("There are no elements on this list");
    }
    let currentElement = this.root;
    while (currentElement) {
      console.log(currentElement.value);
      currentElement = currentElement.next;
    }
  }

  // this is the most complicated method of this exercise
  removeLastElement() {
    // first need to check if there is an element on the list, and by checking for the tail's existence i also check that, since when we're defining the first element
    // the root and the tail are the same
    if (!this.tail || !this.root) {
      // here i check this.root too for later error prevention
      throw new Error("There are no elements on this list.");
    }

    // and when they are the same, both of them are assigned as undefined.
    if (this.tail === this.root) {
      this.tail = undefined;
      this.root = undefined;
      // and the length decreases to 0
      this.length--;
      return;
    }

    // now we need to find the second to last element, which will become the new tail.
    // to do that, we'll loop through the elements until we find the elements whose .next property points at the current tail
    let newTail = this.root; // start at the root
    while (newTail.next && newTail.next !== this.tail) {
      // if newTail.next is not poiting at the current tail, go again...
      // As soon as newTail.next === this.tail, it means we've got to the element we need,
      // and we don't need to continue running the code to move to another element, so the loop stops.
      newTail = newTail.next;
      //  newTail is now the second-to-last element.
    }

    // now we need to set the "next" property of the newTail as undefined
    newTail.next = undefined;
    // now we can finally set the tail as the newTail
    this.tail = newTail;
    // and now decrease the number of elements on the list
    this.length--;
  }
}

// we also need a class for nodes
class NodeElement<T> {
  // each node must contain its value and a link to the next node, if there is one
  constructor(public value: T) {}
  public next?: NodeElement<T> = undefined; // the next node is of type node also
}
// instead of allowing any type for the node, we'll use generics, so typescript can better infer types on the fly

const stringList = new LinkedList<string>();
stringList.add("First Element");
stringList.add("Second Element");
stringList.add("Third Element");
console.log(`Current number of elements: ${stringList.numberOfElements}`);
stringList.getAllElements();
console.log("---------------");
stringList.removeLastElement();
stringList.getAllElements();
console.log(`Current number of elements: ${stringList.numberOfElements}`);
