# Perfect Triangle Numbers

Triangular numbers are a pattern of numbers that form equilateral triangles. Each subsequent number in the sequence adds a new row of dots to the triangle.

A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. For instance, 6 has divisors 1, 2, and 3 (excluding itself), and 1 + 2 + 3 = 6, so 6 is a perfect number.

This application finds all of the perfect triangle numbers in a given interval `[1, b]`. This brief tutorial will introduce you to the semantics behind distributed processing.

## How to create keystore

DCP can be used in computations in which many calculations or the execution of processes are carried out simultaneously. Large problems can often be divided into smaller ones, which can then be solved at the same time and parallel. 

The first step is to sign up at [Distributed Compute portal](https://portal.distributed.computer/) and create a *keystore* at **Accounts** tab. This keystore allows you to deploy jobs by using Distributed Compute Credits or DCC. It is considered as a bank account and DCCs can be transferred from and into the keystore. 

You can earn DDC by starting mining at **Worker** tab and when the work is completed, credits are transferred to your keystore account. You can see the balance of your account by clicking on the refresh button. There are some more option on the drawer navigation like download that let you download the keystore. In the web application you need to upload it before deploying jobs.

## index.html

To accessing DCP all you need is dcp-client, our client API for accessing the distributed computer.
```
<script src="https://scheduler.distributed.computer/dcp-client/dcp-client.js"></script>
```

## index.js

Jobs can be created with the compute.for method. The arguments to this method determines how many slices the job will have and what data each slice should be executed with. Please visit [DCP Developer Guide](https://gitlab.com/Distributed-Compute-Protocol/dcp-docs/-/blob/master/dcp-developer-guide.md) for comprehensive information.




