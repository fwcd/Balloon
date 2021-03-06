Runtime import:"src/test/smalltalk/TestImport.st".
Runtime import:"src/main/smalltalk/Array.st".
Runtime import:"src/main/smalltalk/Set.st".
Runtime import:"src/main/smalltalk/Vector2D.st".

b := (6 times:2).
c := b divide:3.

Transcript show:"=== Number testing ===".
Transcript show:((3 plus:b) divide:(10 minus:c)).

Transcript show:"=== Boolean testing ===".
Transcript show:(true and:false).
Transcript show:(true xor:false).
(false not) ifTrue:[
	Transcript show:"Reached a true block".
] ifFalse:[
	Transcript show:"Reached a false block".
].

Transcript show:"=== Block testing ===".
i := 0.
[i lessOrEqual:5] whileTrue:[
	i := i plus:1.
	Transcript show:i.
].

Transcript show:"=== JS-bridge testing ===".
JS eval:"console.log('Hello JavaScript!')".
(JS get:"console") log:"Hello JSObject!".
jsArray := JS get:"[]".
jsArray push:4.
jsArray push:20.
jsArray push:3.
Transcript show:(jsArray mapUsingJS:"this[1]").

Transcript show:"=== Import testing ===".
Transcript show:someVariable.
Transcript show:anotherVariable.

Transcript show:"=== Local variable testing ===".
a := "A global variable".
b := "A global variable".
[
	| a |
	a := "A local variable".
	b := "A global variable assigned from a block".
	Transcript show:("Local a: " and:a).
	Transcript show:("Local b: " and:b).
] value.
Transcript show:("Global a: " and:a).
Transcript show:("Global b: " and:b).

Transcript show:"=== Dynamic classes testing ===".
vecA := Vector2D ofX:24 andY:12.
vecB := Vector2D ofX:2 andY:3.
vecC := vecA plus:vecB.
Transcript show:(((vecC asString) and:" has the length ") and:(vecC length)).

Transcript show:"=== Array testing ===".
testArray := Array create.
testArray push:5.
testArray push:23.
testArray push:"test".
testArray at:1 put:"replacement".
Transcript show:testArray.
Transcript show:("length: " and:(testArray length)).
testArray forEach:[:each |
	Transcript show:each.
].

Transcript show:"=== Set testing ===".
testSet := Set create.
testSet insert:"one".
testSet insert:"two".
Transcript show:(testSet contains:"three").
Transcript show:(testSet contains:"one").

Transcript show:"=== Block assignment testing ===".
testBlock := [
	| varA varB |
	varA := 4.
	varB := 3.
	varA times:varB.
].
Transcript show:((testBlock value) asString).

Transcript show:"=== String with parentheses testing ===".
Transcript show:(("testA(" and:") testB [") and:"] testC").

Transcript show:"=== JS bridge function conversion testing ===".
Transcript show:((JS eval:"this.square") value:5).
(JS get:"this") setProperty:"cube" to:[:value |
	value pow:3.
].
Transcript show:(JS eval:"this.cube(4)").

Transcript show:"=== Nil testing ===".
Transcript show:(nil isNil).
Transcript show:("test" isNil).
Transcript show:(true isNil).
Transcript show:((4 times:4) isNil).