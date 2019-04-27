+++
title = "Symbolic and Audio Key Detection Based on a Hidden Markov Model"
date = 2018-09-27T00:00:00
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Néstor Nápoles López", "Claire Arthur", "Ichiro Fujinaga"]

# Publication type.
# Legend:
# 0 = Uncategorized
# 1 = Conference paper
# 2 = Journal article
# 3 = Manuscript
# 4 = Report
# 5 = Book
# 6 = Book section
publication_types = ["0"]

# Publication name and optional abbreviated version.
publication = "Poster presented at the *annual meeting of the Music Information Retrieval Evaluation eXchange*."
publication_short = "In *MIREX*"

# Abstract and optional shortened version.
abstract = """
This project started as a symbolic key detection algorithm. In order to participate in the Music Information Retrieval EXchange (MIREX) key detection task, additional audio processing stages have been included. The user input---whether it is a symbolic or an audio file---is pre-processed to obtain a sequence of pitch classes, which becomes the input of the Hidden Markov Model (HMM). The HMM is divided in two parts, the first part outputs a sequence of temporary keys (i.e., tonicizations) and the second part outputs a main key. Both parts rely on a geometric model of key distance (for transition probabilities) and key-profiles (for emission probabilities). The model has been evaluated in both its symbolic and audio implementations. This project was presented as a poster in the annual meeting of MIREX at the International Society for Music Information Retrieval Conference (ISMIR) in Paris, France.
"""

summary = """
Symbolic and audio key estimation algorithm based on Hidden Markov Models. Implemented in C++.
"""

# Is this a selected publication? (true/false)
selected = true

# Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["deep-learning"]` references
#   `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects = []

# Tags (optional).
#   Set `tags = []` for no tags, or use the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = []

# Links (optional).
# url_pdf = "https://dl.acm.org/citation.cfm?id=3273027"
# url_preprint = "#"
url_code = "https://github.com/napulen/justkeydding"
# url_dataset = "#"
# url_project = "#"
# url_slides = "#"
# url_video = "#"
url_poster = "https://napulen.github.io/posters/key-detection.pdf"
# url_source = "#"

# Custom links (optional).
#   Uncomment line below to enable. For multiple links, use the form `[{...}, {...}, {...}]`.
# url_custom = [{name = "Custom Link", url = "http://example.org"}]

# Digital Object Identifier (DOI)
doi = ""

# Does this page contain LaTeX math? (true/false)
math = false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
[image]
  # Caption (optional)
  caption = "Block diagram of the algorithm"

  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  focal_point = "Left"
+++