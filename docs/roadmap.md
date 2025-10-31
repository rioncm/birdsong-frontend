# Frontend Roadmap Notes

- Revisit API access strategy once deployments stabilize. The backend currently allows all origins via CORS for ease of testing; plan to lock this down to explicit frontend domains before launch and document the configuration toggle.

- [x] Clean up 5 minute windows to only show one record per species detected with a detection count (timeline endpoint updated in backend v1.x).

- Add detail to detection:
    - [x] Image
        - [ ] clicking thumbnail opens larger version in a "lightbox" sized to cover the timeline width.
    - [x] Short summary about species
        - [ ] summary display limited to X charcters in timeline display ending with an elipse ... which is clickable show the full summary in view. More info link does not change.  
    - [x] link to more information 
        - TBD: iNaturalist, Wikipedia, Cornel ??
        - Possible administrative setting in backend
    - [x] Update header 
        - from: Current Quarter
                Viewing data for 2025-10-24 · Q3
        - to : Timeline from START_TIME to END_TIME
    - [ ] Pin header on scroll
    - [x] Update time window from and through as scrolling
