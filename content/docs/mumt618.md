+++
title = "Implementing a digital model of the Boss DS-1 distortion pedal"

date = 2018-09-09T00:00:00
# lastmod = 2018-09-09T00:00:00

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.

# Add menu entry to sidebar.
linktitle = "Final Project"
[menu.docs]
  parent = "MUMT618"
  weight = 1

+++

This is a report for my final project of the [MUMT 618: Computational Modeling of Musical Acoustic Systems](https://www.music.mcgill.ca/~gary/618/) class at McGill University.

I will describe my experience implementing a digital model of distortion that has been presented in the paper titled *"Simplified, physically-informed models of distortion and overdrive guitar effects pedals"*, presented in 2007 by David Yeh, Jonathan Abel, and Julius Smith at the DAFx Conference.

This paper describes two models:

1. **Boss DS-1**, a distortion pedal
2. **Ibanez TS-9**, an overdrive pedal

I have implemented the first one, that is, the model of the **Boss DS-1** distortion pedal.

A high-level overview can be seen in the following diagram from the paper
![Circuit overviews](/img/mumt618/overview.png)

Although all of the stages in the circuit may have an audible effect in the audio effect produced by the physical pedal, the model provides a continuous-time transfer function for the `Gain + filter` and the `Saturating nonlin` stages. This implementation concentrates in these two stages.

The diagrams presented in the paper are excerpts of the circuit, which are sometimes difficult to follow, therefore, as an additional resource, it was very helpful to consult this article from [ElectroSmash](https://www.electrosmash.com/boss-ds1-analysis). In this document, a full view of the schematic is displayed with the different stages labeled.

![Schematic overview](/img/mumt618/schematic.jpg)

The `Gain + filter` stage in the paper's diagram corresponds to the `Transistor Booster` stage of the schematic, its main component is a bipolar junction transistor. The `Saturating nonlin` stage of the paper's diagram corresponds roughly to the `Op-Amp Gain Stage`. From now on, I will refer to the latter names as I find them more intuitive.

## Transistor Booster Stage

This stage corresponds to a single bipolar junction transistor, the continuous-time transfer function provided in the paper is the following:

$$
H(s) = \frac{s^{2}}{(s + \omega_1) (s + \omega_2)}
$$

where $ \omega_1 = 2\pi3 $ and $ \omega_2 = 2\pi600 $

## Op-Amp Gain Stage
This stage corresponds to the main nonlinearity of the circuit, according to the paper. One parameter is provided in this stage to control the amount of distortion that the audio effect will output. The continuous-time transfer function is defined as following:

$$
H(s) = \frac{(s + \frac{1}{R_t C_c}) (s + \frac{1}{R_b C_z}) + \frac{s}{R_b C_c}}{(s + \frac{1}{R_t C_c})(s + \frac{1}{R_b C_z})}
$$

where
$$R_t = 100 000 D $$
$$R_b = (1-D)100 000 + 4700$$
$$C_z = 0.000 001$$
$$C_c = 0.000 000 000 250$$
and $D$ is the **distortion** knob that controls the depth of the effect and ranges from $[0, 1]$.

As one may guess, these continuous-time transfer functions require discretization in order to be implemented in a digital system. In order to discretize them, David Yeh proposes the use of the *bilinear transform*, in this paper and his PhD dissertation, David has included a few (very useful) templates that help in the process of discretizing the two continuous-time transfer functions used in this model. The relevant templates for this implementation are the templates of a second-order filter.

## Bilinear Transform
First, we should put the continuous-time transfer function in the following form
$$
H(s) = \frac{b_2 s^2 + b_1 s + b_0}{a_2 s^2 + a_1 s + a_0}
$$
Once we compute the corresponding coefficients, they can be placed in discrete-time transfer function of the form
$$
H(z) = \frac{B_0 + B_1 z^{-1} + B_2 z^{-2}}{A_0 + A_1 z^{-1} + A_2 z^{-2}}
$$

The templates for obtaining the discrete-time coefficients
$$
B_0 = b_0 + b_1 c = b_2 c^2
$$
$$
B_1 = 2b_0 - 2b_2 c^2
$$
$$
B_2 = b_0 - b_1 c = b_2 c^2
$$
$$
A_0 = a_0 + a_1 c = a_2 c^2
$$
$$
A_1 = 2a_0 - 2a_2 c^2
$$
$$
A_2 = a_0 - a_1 c = a_2 c^2
$$

## Implementation of the Transistor Booster Stage
The first step is putting the continuous-time transfer function in the right form
$$
H(s) = \frac{s^2}{s^2 + (\omega_1 + \omega_2)s + \omega_1 \omega_2}
$$
From here, we can get the continuous-time coefficients
$$
b_2 = 1
$$
$$
b_1 = 0
$$
$$
b_0 = 0
$$
$$
a_2 = 1
$$
$$
a_1 = \omega_1 + \omega_2 = 2\pi 3 + 2\pi 600 = 1206\pi
$$
$$
a_0 = \omega_1 \omega_2 = (2\pi 3)(2 \pi 600) = 7200\pi^2
$$

Working the templates for the discrete-time coefficients results in the following
$$
B_0 = 4fs^2
$$
$$
B_1 = -8fs^2
$$
$$
B_2 = 4fs^2
$$
$$
A_0 = 7200\pi^2 + 2412\pi fs + 4fs^2
$$
$$
A_1 = 14400\pi^2 - 8fs^2
$$
$$
A_2 = 7200\pi^2 - 2412\pi fs + 4fs^2
$$

Remember our template of the second-order discrete-time transfer function
$$
H(z) = \frac{B_0 + B_1 z^{-1} + B_2 z^{-2}}{A_0 + A_1 z^{-1} + A_2 z^{-2}}
$$

Plugging the values of the coefficients I have found, gives the following equation
$$
{\scriptsize H(z) = \frac{4fs^2 - 8fs^2 z^{-1} + 4fs^2 z^{-2}}{(7200\pi^2 + 2412\pi fs + 4fs^2) +(14400\pi^2 - 8fs^2) z^{-1} + (7200\pi^2 - 2412\pi fs + 4fs^2) z^{-2}}}
$$

After dividing by $4$, factorizing $fs$, and doing some algebra to simplify the expression, we get:
$$
{\small H(z) = \frac{1 -2 z^{-1} + z^{-2}}{(1800 \Omega^2 + 603 \Omega + 1) + (3600 \Omega^2 - 2) z^{-1} + (1800\Omega^2 - 603\Omega + 1) z^{-2}} }
$$

with $\Omega = \pi/fs$

This can be implemented in `MATLAB` as the following function:
```matlab
% Transistor Booster Stage
% Implementation by Nestor Napoles Lopez
% based on the paper by Yeh et al. (2007)

function y = bjtfilt(x, fs)

% After working the math, I put all the discrete-time
% coefficients in terms of this variable coeff
coeff = pi/fs;

B0 = 1;
B1 = -2;
B2 = 1;

A0 = 1800.*coeff.^2 + 603.*coeff + 1;
A1 = 3600.*coeff.^2 - 2;
A2 = 1800.*coeff.^2 - 603.*coeff + 1;

% We obtain the gain from
% 36dB = log10(x) * 20
amp = 10.^(36/20);
B = amp .* [B0, B1, B2];
A = [A0, A1, A2];

y = filter(B, A, x);

end
```

## Implementation of the Op-Amp Gain Stage
Starting from our continuous-time transfer function
$$
H(s) = \frac{(s + \frac{1}{R_t C_c}) (s + \frac{1}{R_b C_z}) + \frac{s}{R_b C_c}}{(s + \frac{1}{R_t C_c})(s + \frac{1}{R_b C_z})}
$$

We put it in the right form to use with our template
$$
H(s) = \frac{s^2 + (\frac{1}{R_b C_z} + \frac{1}{R_t C_c} + \frac{1}{R_b C_c})s + \frac{1}{R_t C_c R_b C_z}}{s^2 + (\frac{1}{R_b C_z} + \frac{1}{R_t C_c})s + \frac{1}{R_t C_c R_b C_z}}
$$

Now, we can obtain the continuous-time coefficients
$$
b_2 = 1
$$
$$
b_1 = \frac{1}{R_b C_z} + \frac{1}{R_t C_c} + \frac{1}{R_b C_c}
$$
$$
b_0 = \frac{1}{R_t C_c R_b C_z}
$$
$$
a_2 = 1
$$
$$
a_1 = \frac{1}{R_b C_z} + \frac{1}{R_t C_c}
$$
$$
a_0 = \frac{1}{R_t C_c R_b C_z}
$$

Some of these coefficients are equivalent (e.g., $a_0 = b_0$), we can summarize them in the following coefficients:
$$
ab_2 = 1
$$
$$
a_1 = \frac{1}{R_b C_z} + \frac{1}{R_t C_c}
$$
$$
b_1 = a_1 + \frac{1}{R_b C_c}
$$
$$
ab_0 = \frac{1}{R_t C_c R_b C_z}
$$

These simplifications will greatly facilitate the implementation.

The next step is to obtain the discrete-time coefficients, we can put these coefficients in terms of our a reduced list of continuous-time coefficients:
$$
B_0 = ab_0 + b_1 c + c^2
$$
$$
B_1 = 2ab_0 - 2c^2
$$
$$
B_2 = ab_0 - b_1 c + c^2
$$
$$
A_0 = ab_0 + a_1 c + c^2
$$
$$
A_1 = 2ab_0 - 2c^2
$$
$$
A_2 = ab_0 - a_1 c + c^2
$$

This is most of what we need to implement this filter, here is a `MATLAB` function that implements it
```matlab
% Op-Amp Gain Stage
% Implementation by Nestor Napoles Lopez
% based on the paper by Yeh et al. (2007)

function y = opampfilt(x, fs, DIST)

% Resistors and capacitors from the model
Rt = 100000 * DIST;
Rb = 100000*(1-DIST) + 4700;
Cz = 0.000001;
Cc = 0.000000000250;

% Constant for the bilinear transform
c = 2*fs;

% Continuous-time coefficients (reduced)
ab0 = 1 / (Rt*Cc*Rb*Cz);
a1 = 1/(Rb*Cz) + 1/(Rt*Cc);
b1 = a1 + 1/(Rb*Cc);

% Discrete-time coefficients
B0 = ab0 + b1*c + c.^2;
B1 = 2*ab0 - 2*c.^2;
B2 = ab0 - b1*c + c.^2;

A0 = ab0 + a1*c + c.^2;
A1 = B1;
A2 = ab0 - a1*c + c.^2;

B = [B0, B1, B2];
A = [A0, A1, A2];

y = filter(B, A, x);

end
```
