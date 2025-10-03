# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - heading "Knowledge Capture Interface" [level=1] [ref=e6]
    - button "Add New Entry" [ref=e7] [cursor=pointer]:
      - img [ref=e8] [cursor=pointer]
      - text: Add New Entry
  - main [ref=e10]:
    - list [ref=e11]:
      - listitem [ref=e12]:
        - generic [ref=e14]: No Image Captured
        - generic [ref=e15]:
          - heading "Updated Entry" [level=3] [ref=e16]
          - paragraph [ref=e17]: This entry has been updated.
          - generic [ref=e18]:
            - button "Edit Updated Entry" [ref=e19] [cursor=pointer]: Edit
            - button "Delete Updated Entry" [active] [ref=e20] [cursor=pointer]: Delete
      - listitem [ref=e21]:
        - generic [ref=e23]: No Image Captured
        - generic [ref=e24]:
          - heading "Test Entry" [level=3] [ref=e25]
          - paragraph [ref=e26]: This is a test entry.
          - generic [ref=e27]:
            - button "Edit Test Entry" [ref=e28] [cursor=pointer]: Edit
            - button "Delete Test Entry" [ref=e29] [cursor=pointer]: Delete
```