# dcp-web-example

A sample web application showing how to deploy a job using the Distributed Computer.

This application finds all of the triangular numbers in a given interval
`[1, b]`. This brief tutorial will introduce you to the semantics behind
distributed processing.

## Background: Triangular Numbers

Triangular numbers are a pattern of numbers that form equilateral triangles.
Each subsequent number in the sequence adds a new row of dots to the triangle.

A perfect number is a positive integer that is equal to the sum of its positive
divisors, excluding the number itself. For instance, 6 has divisors 1, 2, and 3
(excluding itself), and 1 + 2 + 3 = 6, so 6 is a perfect number.

## How to start

The Distributed Computer can be used in computations in which many calculations or the execution of
processes are carried out simultaneously. Large problems can often be divided
into smaller ones, which can then be solved at the same time and in parallel.

The first step is to sign up for the beta program to use the Distributed Computer called [First Developers](https://docs.google.com/forms/d/e/1FAIpQLScj6g1PH7Nbejlj5XHrScvtBhTy-2A_l0A8sHMzzihQR79KYw/viewform) (or "First Devs").
When you have done this, follow the email instructions to arrive at the [Getting Started](https://docs.dcp.dev/getting-started) guide, where we have more
information on how to begin. You will need a pair of API keys called a 'Bank Keystore' and an 'ID Keystore' to deploy jobs. As is described in the 
documentation, your Bank Keystore is similar to a 'bank account' where you hold a certain amount of credits that
are transferred from you to the owner of the compute hardware when tasks are completed.

Every First Dev will be given free credits. You can also earn them by completing computations for 
other users on the Distributed Computers in the **Worker** tab of our [portal](https://portal.distributed.computer/). You can see the
balance of your account by clicking on the refresh button next to 'Balance'. There are
some more options like 'Download' that let you download
the Bank Keystore file. In this web application, you will need to upload it in order to
deploy jobs.

## index.html

To access the Distributed Computer all you need is dcp-client, our client API for accessing the
Distributed Computer.

```html
<script src="https://scheduler.distributed.computer/dcp-client/dcp-client.js"></script>
```

## index.js

Jobs can be created with the `compute.for` method. The arguments to this method
determines how many slices the job will have and what data each slice should be
executed with. Please visit
our [Developer Guide](https://docs.dcp.dev/guides/developer-guide.html)
for more comprehensive information.

## Preview

A preview of the website using GitHub Pages is live at https://kings-distributed-systems.github.io/dcp-web-example/.

Happy coding!
