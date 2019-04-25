+++
title = "Encoding Matters"
date = 2018-09-28T00:00:00
draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Néstor Nápoles López", "Gabriel Vigliensoni", "Ichiro Fujinaga"]

# Publication type.
# Legend:
# 0 = Uncategorized
# 1 = Conference paper
# 2 = Journal article
# 3 = Manuscript
# 4 = Report
# 5 = Book
# 6 = Book section
publication_types = ["1"]

# Publication name and optional abbreviated version.
publication = "In *5th International Conference on Digital Libraries for Musicology*."
publication_short = "In *DLFM*"

# Abstract and optional shortened version.
abstract = """
In this paper, we discuss how different encodings in symbolic music files can have consequences for music analysis, where a truthful representation, not only of the musical score, but of the semantics of the music, can change the results of music analysis tools. We introduce a series of examples in which different encodings effectively modify the content of two---apparently equivalent---symbolic music files. These examples have been obtained from comparing three different encodings of a string quartet movement by Ludwig van Beethoven.

We present two scenarios in which encoding discrepancies may be introduced. In the first scenario, they have been introduced during the encoding of the symbolic music file by either the music notation software or the human encoder. The discrepancies introduced in this scenario are typically difficult to notice because they are visually identical to an accurate encoding. In the second scenario, the discrepancies have been introduced during the translation of the original file into other symbolic formats. In this scenario, the discrepancies may be related to propagating errors in the original encoding or to an erroneous translation of certain attributes of the musical content. Finally, we discuss the possibility of using the examples provided here for the mitigation of some of these discrepancies in the future.
"""

abstract_short = """
In this paper, we present examples of encoding discrepancies that have been introduced either during the encoding of the symbolic music files or during the translation of the original file into other symbolic formats. Some of the discrepancies introduced are difficult to notice because they are visually identical to an accurate encoding, in the worst scenario, these discrepancies could also propagate to the rest of the score. We discuss how these discrepancies can have consequences for music analysis and the possibility of using the examples provided here for the mitigation of some of these discrepancies in the future.
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
url_pdf = "https://dl.acm.org/citation.cfm?id=3273027"
# url_preprint = "#"
url_code = "https://github.com/napulen/encoding_matters"
# url_dataset = "#"
# url_project = "#"
# url_slides = "#"
# url_video = "#"
# url_poster = "#"
# url_source = "#"

# Custom links (optional).
#   Uncomment line below to enable. For multiple links, use the form `[{...}, {...}, {...}]`.
# url_custom = [{name = "Custom Link", url = "http://example.org"}]

# Digital Object Identifier (DOI)
doi = "10.1145/3273024.3273027"

# Does this page contain LaTeX math? (true/false)
math = false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
[image]
  # Caption (optional)
  caption = "Photo by Gabriel Vigliensoni"

  # Focal point (optional)
  # Options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
  # focal_point = "Smart"
+++