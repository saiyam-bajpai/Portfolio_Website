# Sasti Dawai --- Machine Learning & AI Layer

**AAYU 2026 Hackathon \| Technical README for PPT preparation**\
**Project:** Sasti Dawai --- "Scan a medicine strip. Find the exact same
salt for less."\
**Scope:** ML, medicine-catalogue processing, product resolution,
deterministic equivalence checks, image-quality controls, and safety
boundaries.

> **Core principle: AI reads. Verified data checks. Deterministic code
> decides.**
>
> This document distinguishes **implemented and tested components** from
> **planned/incomplete integration**. The current implementation reports
> use a mock vision extractor for offline tests; a live vision
> model/provider and a fully integrated public scan API have not yet
> been confirmed as complete.

------------------------------------------------------------------------

## 1. Executive summary

Sasti Dawai aims to help users understand the visible details on an
Indian medicine strip or box and find a **verified exact-equivalent
generic product** in the Jan Aushadhi/PMBJP catalogue where the evidence
supports it.

The ML subsystem is not designed to diagnose illness or decide what a
patient should take. Its job is to:

1.  Validate the uploaded medicine-pack image and flag poor image
    quality.
2.  Extract visible product information into a strict structured format.
3.  Preserve uncertainty, confidence, evidence, and provenance for each
    field.
4.  Normalize medicine names, ingredient/salt representations,
    strengths, units, dosage forms, release types, and routes.
5.  Retrieve possible catalogue candidates using controlled lookups and
    lexical matching.
6.  Pass candidates to deterministic matching rules.
7.  Abstain when critical information is missing, contradictory, or not
    supported by the catalogue.
8.  Return evidence-backed results to the application; never invent a
    match or a price.

**Important:** successfully reading a brand name is not proof that two
medicines are equivalent. Similar brand names, fuzzy-search scores, user
confirmation, or an LLM-generated explanation must never independently
authorize an `EXACT` match.

------------------------------------------------------------------------

## 2. The problem the ML layer addresses

Medicine packaging often contains small, dense text. A brand name may
not reveal its active ingredients, strength, dosage form, or release
mechanism. Manually comparing these details with a generic catalogue is
time-consuming and error-prone.

The ML layer addresses the *reading and retrieval* problem while leaving
the final equivalence decision to explicit, testable rules.

### Input

-   One to three photos of a medicine strip or box.
-   Potentially visible brand, composition, strength, dosage form,
    release markers, route, pack size, printed MRP, batch/expiry
    information, and barcode/QR data.

### Intended output

-   Structured extracted fields with field-level uncertainty and
    evidence.
-   Candidate catalogue products and the evidence supporting retrieval.
-   A deterministic match tier: `EXACT`, `CLOSE`, or `NONE`, when enough
    verified evidence exists.
-   Or a safe workflow outcome such as retake, reject, confirmation
    required, or recoverable error.
-   Prices only when the source and price provenance support displaying
    them.

### Explicitly out of scope

-   Diagnosing a condition.
-   Recommending a dose or treatment.
-   Telling a user to start, stop, split, double, or switch medicine.
-   Treating semantic similarity as proof of medical equivalence.
-   Allowing an LLM to invent medicine matches, prices, stock,
    discounts, or safety conclusions.
-   Training a large model from scratch or fine-tuning without evidence
    that it is necessary.

------------------------------------------------------------------------

## 3. End-to-end architecture

``` text
User uploads 1–3 medicine-pack images
                 |
                 v
       Image validation / quality gate
  (format, bytes, dimensions, blur, brightness, glare)
                 |
          acceptable image?
          /             \
        no               yes
        |                 |
        v                 v
 Retake/reject      Extraction interface
                    (mock provider currently
                     used in offline tests)
                           |
                           v
                Strict schema validation
             (unknown/unreadable values stay null)
                           |
                           v
                 Multi-image reconciliation
              (critical contradictions are flagged)
                           |
                           v
              Canonical normalization layer
        (ingredient set, strength, units, form,
              release type, route, denominator)
                           |
                           v
                 Candidate retrieval
      (normalized lookup → synonym lookup →
       brand/composition lookup → lexical fallback)
                           |
                           v
             Deterministic safety matcher
            /          |            \
         EXACT        CLOSE          NONE
           |             |              |
      price/savings   informational   no verified
      only if trusted  comparison      exact match
            \           |             /
             v          v            v
             Structured result + warnings
             + doctor/pharmacist disclaimer
```

### Architectural separation

  -----------------------------------------------------------------------
  Component               Responsibility          Must not do
  ----------------------- ----------------------- -----------------------
  Image-quality gate      Detect invalid,         Claim that a
                          unsupported,            good-quality image is a
                          unreadable, or          verified medicine
                          poor-quality images     

  Vision/OCR extraction   Read visible text and   Decide medicine
                          report uncertainty      equivalence

  Normalizer              Convert representations Erase meaningful
                          into canonical fields   salt/release
                                                  distinctions

  Catalogue ETL           Import and quarantine   Treat every row or
                          source records with     price as trustworthy
                          provenance              

  Candidate resolver      Retrieve plausible      Promote similarity into
                          catalogue records       `EXACT`

  Deterministic matcher   Apply explicit          Guess missing
                          equivalence and safety  ingredients, strength,
                          rules                   release type, or route

  Explainer/UI            Communicate verified    Generate unsupported
                          result and next action  clinical advice or
                                                  prices
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 4. Technology and implementation status

### Reported stack

-   **Python** --- core ML/data processing.
-   **Pydantic v2** --- structured schemas and validation.
-   **FastAPI** --- backend framework in the project environment;
    end-to-end `/v1/scan` integration is still pending in the reported
    implementation.
-   **Pillow / OpenCV** --- image decoding and image-quality checks.
-   **RapidFuzz** --- lexical fuzzy retrieval for candidate discovery.
-   **SQLite / SQLAlchemy-oriented catalogue path** --- local
    development and structured catalogue access; PostgreSQL is a
    deployment/scaling option, not a requirement for the current local
    baseline.
-   **pytest** --- unit and integration tests.
-   **Mock vision extractor** --- deterministic test fixtures so tests
    run without external API credentials.

The environment report lists Python 3.14.6. Package installation alone
does not prove every dependency is fully compatible in every runtime, so
the deployed Python/runtime combination must be verified separately.

### Current implementation status

  -----------------------------------------------------------------------
  Area                                Status based on the latest
                                      implementation reports
  ----------------------------------- -----------------------------------
  Pydantic schemas and contracts      Implemented; reported tests passing

  Medicine text normalization         Implemented; reported tests passing

  Deterministic `EXACT` / `CLOSE` /   Implemented with synthetic safety
  `NONE` matcher                      fixtures

  Catalogue ETL and                   Implemented for audited source
  provenance/eligibility fields       files

  Candidate resolver and lexical      Implemented; small curated
  retrieval benchmark                 benchmark only

  Image validation and quality checks Implemented

  Provider-independent extraction     Implemented
  interface                           

  Mock extraction provider            Implemented for offline tests

  Multi-image contradiction detection Implemented

  Critical-evidence quarantine /      Implemented and integration-tested
  fail-closed matching                in reported tests

  Live vision model/provider          **Not yet confirmed implemented**

  OCR cross-check in the full live    **Pending / not confirmed
  pipeline                            integrated**

  Barcode/QR decoding                 Planned; not confirmed implemented

  End-to-end production               **Pending in the latest reported
  `POST /v1/scan` API                 status**

  Golden evaluation on 50--100        Pending
  labelled real pack photos           

  Production deployment and load      Pending
  testing                             
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 5. Image validation and quality gate

The image-quality module is intended to stop invalid or unusable uploads
before extraction.

### Reported checks

-   Supported formats: JPEG, PNG, and WebP.
-   Up to **3 images per scan**.
-   Reported size limit: **1.5 MB per image**, with a **4.5 MB total
    batch limit**.
-   Minimum dimensions: **128 × 128 pixels**.
-   Maximum decoded pixel count: **16 megapixels**.
-   Maximum dimension: **4096 pixels**.
-   Full image decoding rather than trusting only the filename or MIME
    declaration.
-   EXIF orientation handling.
-   Corrupt, truncated, spoofed, or unsafe image inputs are rejected.
-   Configurable heuristic checks for blur, brightness, and glare.

### Reported initial heuristic thresholds

-   Blur: Laplacian variance below 100.
-   Brightness: mean brightness below 40 or above 235.
-   Glare: more than 15% of pixels at intensity 250 or above.

These are engineering heuristics, not universally correct thresholds.
They should be tuned against a labelled image set and tested on
different cameras, packaging materials, lighting, and backgrounds.

### Expected safe behavior

-   Invalid file → reject and request a valid image.
-   Blurry, too dark, or glare-heavy image → explain how to retake it.
-   Quality checks pass → permit extraction, **not** an automatic
    medicine match.
-   A non-medicine image → do not return a medicine match.

### Security and robustness

The reported hardening includes handling for malformed/truncated image
data, EXIF orientation, and pixel-limit errors. The integration audit
also reported that the Pillow pixel-limit setting is restored after
validation rather than left globally mutated. This should continue to be
tested because image decoders and global settings can have concurrency
implications.

------------------------------------------------------------------------

## 6. Structured extraction and uncertainty

The extractor is designed behind a provider-independent interface so a
real vision provider can later replace the mock without rewriting the
normalizer, resolver, or matcher.

### Fields the extraction contract is designed to represent

-   Brand / product name.
-   Active ingredient or composition, including combination medicines.
-   Strength and its denominator, such as `500 mg per tablet` versus
    `250 mg per 5 mL`.
-   Dosage form: tablet, capsule, syrup, suspension, injection, cream,
    drops, inhaler, etc.
-   Release type: immediate, sustained, extended, delayed, modified, or
    unknown.
-   Route where it can be supported.
-   Pack/packaging information.
-   Printed MRP and expiry where readable and relevant.
-   Field-level confidence, evidence/provenance, and warnings.

### Uncertainty policy

-   Unreadable fields remain `null` or `UNKNOWN`; the system must not
    guess.
-   Missing strength or incomplete composition blocks an exact match.
-   Malformed provider output must fail schema validation.
-   A high model confidence score is not proof of correctness.
-   A user may correct a field, but confirmation alone does not
    establish equivalence.
-   Extraction and match status are separate concepts.

### Mock provider

The reported mock extractor includes synthetic presets for examples such
as: - AUGMENTIN 625 DUO. - GLYCOMET 500 PR. - Dispersible amoxicillin. -
Non-medicine image. - Unreadable strength. - Empty composition. -
Low-confidence extraction.

These are **test fixtures**, not a claim that a real vision model has
achieved a particular accuracy. They enable deterministic offline tests
of downstream safety behavior.

------------------------------------------------------------------------

## 7. Multi-image reconciliation and evidence conflict

Multiple photos can help capture different sides of a package, but they
can also contradict one another. The system must not silently choose
whichever value makes a match possible.

The reported reconciliation layer detects conflicts across critical
fields, including: - Composition / ingredient set. - Strength. - Dosage
form. - Release type. - Route.

When critical values conflict, the implementation reports an extraction
conflict, clears the disputed canonical value or marks it unknown, sets
confidence to zero for the conflicted field, and moves the workflow to a
confirmation-required state. The downstream canonical
conversion/resolver path is guarded so conflicted evidence is not
treated as eligible for exact matching.

**Safety rule:** adding more images must not make contradictory evidence
appear certain.

------------------------------------------------------------------------

## 8. Medicine normalization

Real-world medicine labels use inconsistent spellings, abbreviations,
units, and orderings. The normalization layer maps supported
representations into canonical structures before matching.

### Normalization responsibilities

-   Standardize ingredient/salt text using controlled aliases and
    synonyms.
-   Normalize strength units while preserving the original printed text.
-   Preserve the denominator: per tablet, per capsule, per 5 mL, etc.
-   Normalize dosage forms into controlled categories.
-   Detect release markers such as IR, SR, ER, XR, CR, MR, PR, DR, and
    EC where supported.
-   Normalize route where evidence supports it.
-   Represent fixed-dose combinations as complete ingredient-strength
    sets, independent of display order.
-   Preserve raw source text and explicit release evidence so
    normalization does not hide uncertainty.

### Important limitations

-   Similar salt names must not automatically be treated as equivalent
    salts.
-   Salt modifiers can carry meaningful distinctions; stripping a suffix
    is not sufficient proof of equivalence.
-   A missing release marker means **unknown**, not automatically
    immediate release.
-   Unit conversion is safe only when the units and denominators are
    compatible and the conversion is defined.
-   `mg/tablet` and `mg/5 mL` cannot be directly compared without a
    valid conversion.

------------------------------------------------------------------------

## 9. Deterministic medicine matcher

The matcher is the final authority for match tier. The vision model and
candidate resolver only supply evidence and candidates.

### Canonical exact-equivalence checks

The implementation evaluates the relevant dimensions:

1.  Complete active ingredient/moiety set.
2.  Strength and denominator.
3.  Dosage form.
4.  Release type.
5.  Route.
6.  Salt/modifier distinctions where represented by the canonical schema
    and rules.

The exact rule must be based on complete, verified evidence. Missing or
uncertain critical fields do not qualify as a match.

### Match tiers

  -----------------------------------------------------------------------
  Tier                    Meaning                 Savings allowed?
  ----------------------- ----------------------- -----------------------
  `EXACT`                 All required            Only if both prices are
                          equivalence fields and  valid, comparable, and
                          safety gates pass       appropriately sourced

  `CLOSE`                 A related candidate     No
                          exists but one or more  
                          material details differ 
                          or are not exact        

  `NONE`                  No verified candidate,  No
                          incomplete/uncertain    
                          evidence, unsupported   
                          comparison, or safety   
                          gate failure            
  -----------------------------------------------------------------------

### Non-negotiable safety boundaries

-   SR/ER/XR/MR versus immediate-release products must never be `EXACT`.
-   Every ingredient and strength in a combination product must match.
-   Different strength is not an exact match.
-   Similar spelling or a high fuzzy score is retrieval evidence only.
-   Vector similarity, if added later, is retrieval evidence only.
-   Brand and printed composition conflict blocks automatic matching.
-   Unknown release type cannot be silently assumed to match.
-   User confirmation does not override missing evidence or
    deterministic rules.
-   `CLOSE` and `NONE` never produce savings claims.
-   A failed/low-confidence extraction must not be converted to `EXACT`
    by an LLM explanation.

### Price safety

A correct medicine match and a trustworthy price are separate decisions.
An otherwise valid medicine match does not justify a savings claim if
the price is undated, unverified, stale, or not comparable on the same
unit/pack basis. Price uncertainty should suppress savings, not
manufacture a medicine equivalence result.

------------------------------------------------------------------------

## 10. Catalogue ingestion and data provenance

Two source files were reported during implementation. The exact files,
schema, and provenance must remain traceable; the commercial dataset
should not be treated as an authoritative current-price source.

### Dataset audit reported by the implementation

#### Jan Aushadhi product list

-   Input rows: **2,439**.
-   Accepted rows: **1,514**.
-   Quarantined rows: **925**.
-   Accepted rows reported as eligible for `EXACT` matching: **167**.
-   Accepted rows with unknown release markers and therefore not
    eligible for exact matching: **1,347**.
-   Quarantine breakdown reported:
    -   406 non-chemical, surgical, or ambiguous records.
    -   344 invalid or zero-MRP records.
    -   175 unparseable or special-packaging records.

The filename timestamp was treated as the export/retrieval date (**8
October 2026**), not as proof that every listed price is a government
notification issued on that date. A price date is not the same as
verified price freshness.

#### Indian Medicine Dataset --- audited sample only

-   Source file reportedly contains **253,973** rows.
-   The implementation report audited **500 rows**, not the entire
    dataset.
-   469 sample rows accepted as reference records: 433 active and 36
    discontinued.
-   31 sample rows quarantined.
-   Zero rows from this sample were eligible as generic match targets.
-   Scraped commercial prices were marked unverified / with unverified
    price date.

**Do not present the 500-row audit as a full 253,973-row cleaning
result.**

### ETL safeguards

-   Preserve raw source data and file checksums.
-   Record source and retrieval/export provenance.
-   Separate product eligibility from discontinuation status and price
    verification.
-   Quarantine invalid, ambiguous, unsupported, or malformed rows rather
    than forcing them into matching.
-   Preserve original ingredient text and release-marker evidence.
-   Do not fabricate missing fields, prices, or catalogue entries.
-   Keep source records distinct from normalized canonical fields.

### Why many records are excluded

A catalogue record with an unknown release type may be useful for
browsing or manual investigation, but it cannot safely establish exact
equivalence if release type is a required comparison dimension. The
system intentionally prefers a visible "could not verify" outcome over
an unsafe exact result.

------------------------------------------------------------------------

## 11. Candidate resolution and retrieval

Candidate resolution answers: **"Which catalogue records should the
deterministic matcher inspect?"** It does not answer: **"Are these
products medically equivalent?"**

### Reported retrieval sequence

1.  Normalized catalogue lookup.
2.  Controlled synonym lookup.
3.  Commercial brand-to-salt reference lookup.
4.  RapidFuzz lexical fallback to discover possible candidates.
5.  Pass each candidate to the deterministic matcher and apply
    eligibility/safety gates.

Candidates can be returned with evidence, but retrieval similarity alone
never establishes `EXACT`.

### Reported benchmark

The implementation report describes a small curated set of **30
queries**: - Train split: 15 queries. - Held-out test split: 15 queries.

  --------------------------------------------------------------------------
  Metric                    Train (15)          Test (15)       Overall (30)
  ----------------- ------------------ ------------------ ------------------
  Top-1 retrieval               93.33%             73.33%             83.33%
  recall/accuracy                                         
  as reported                                             

  Top-3 recall as                 100%               100%               100%
  reported                                                

  Tier accuracy as              93.33%             93.33%             93.33%
  reported                                                

  False `EXACT` in                   0                  0                  0
  this benchmark                                          

  Mean latency as             33.49 ms           37.97 ms           35.47 ms
  reported                                                

  p95 latency as              49.62 ms           87.46 ms            55.8 ms
  reported                                                
  --------------------------------------------------------------------------

**Interpretation caveat:** these are results from a small, curated,
30-query benchmark, not a clinical validation study or proof of
real-world safety. The exact ground-truth definition behind "tier
accuracy" should be documented clearly before using it in a public
claim. Top-3 retrieval means the expected candidate was retrieved in the
top three; it does not mean the medicine was safely matched.

------------------------------------------------------------------------

## 12. Tests and reported verification

The following counts are taken from the implementation reports produced
during development. They should be re-run from the final repository
before a demo, submission, or public claim.

  -----------------------------------------------------------------------------
  Milestone                          Reported test result What it covered
  -------------------------- ---------------------------- ---------------------
  Schemas/contracts                             22 passed Required fields,
                                                          invalid state/tier
                                                          combinations,
                                                          response contract

  Normalization                      97 cumulative passed Normalization tests
                                                          plus schema tests

  Matcher                           118 cumulative passed Exact/close/none
                                                          boundaries and
                                                          synthetic edge cases

  Catalogue ETL audit               142 cumulative passed ETL, matcher,
                                                          normalization,
                                                          schemas

  ETL audit hardening               145 cumulative passed Eligibility, price
                                                          provenance, release
                                                          evidence, quarantine

  Candidate resolver                167 cumulative passed Resolver, retrieval,
                                                          and earlier modules

  Image quality/extractor           195 cumulative passed Image checks,
  interface                                               extraction contract,
                                                          mock provider

  Image                             210 cumulative passed Corrupt/spoofed
  hardening/reconciliation                                images, EXIF/pixel
                                                          limits, conflicts

  Integration audit             **218 cumulative passed** Raw bytes → quality
                                                          gate → mock extractor
                                                          → reconciliation →
                                                          canonical conversion
                                                          → resolver/matcher
  -----------------------------------------------------------------------------

These are **reported historical test results**, not independently rerun
in this document-generation step. Confirm the current test count and
current branch status directly in the project workspace.

### Important tested safety scenarios reported

-   Unsupported/corrupt/truncated/spoofed image data.
-   Poor image quality and retake guidance.
-   Non-medicine image handling.
-   Missing or unreadable critical fields.
-   Conflicting ingredient, strength, form, release, or route evidence
    across images.
-   Ineligible or quarantined catalogue rows.
-   Unknown release type.
-   Exact versus close/none boundary cases.
-   Price/savings suppression outside permitted exact-match conditions.
-   Safe abstention rather than fabricated matches.

------------------------------------------------------------------------

## 13. API integration and runtime behavior

The target API contract includes a scan endpoint such as:

`POST /v1/scan`

Expected request: - Multipart upload containing one to three images. -
Optional language and request/correlation ID.

Expected response fields may include: - Workflow status. - Extracted
fields and per-field status. - Candidate products and evidence. - Match
tier. - Warnings and next action. - Model/rule/catalogue version
identifiers. - Latency metadata.

**Current status caveat:** the latest reported integration audit traced
the ML components together in tests, but reported that the full
`POST /v1/scan` orchestration and live vision/OCR provider integration
were still pending. Do not claim the full production request/response
path is deployed until verified in the actual repository.

### Intended per-request flow

1.  Backend receives the image request.
2.  Validate image bytes, dimensions, size, and quality.
3.  Call the configured extraction provider.
4.  Validate extraction against the strict schema.
5.  Reconcile fields across submitted images and any available
    OCR/barcode evidence.
6.  Normalize supported fields.
7.  Retrieve candidate records from the catalogue.
8.  Apply deterministic matching and price provenance rules.
9.  Return structured JSON with warnings and the required confirmation
    disclaimer.

For a deployed service, one shared model/provider can serve many users.
It is not necessary to create a model per user. Throughput depends on
the selected inference provider, server resources, concurrency limits,
rate limits, and deployment configuration. A mock extractor is only for
development/tests and must not be represented as a live ML inference
service.

------------------------------------------------------------------------

## 14. Privacy, reliability, and failure handling

### Privacy principles

-   Do not retain raw medicine photos by default.
-   Do not put image bytes, personal details, or sensitive user content
    in application logs.
-   Keep provider credentials in environment variables/secrets, never in
    source code.
-   Use synthetic fixtures for tests and avoid real patient data.
-   If feedback is collected later, review it before using it to change
    rules or train models.

### Fail-closed behavior

-   Invalid or non-medicine image → reject safely.
-   Poor-quality image → ask for retake.
-   Provider timeout or malformed output → recoverable error; do not
    return a verified match.
-   Missing critical field → abstain from exact matching.
-   Conflicting evidence → block automatic matching and request
    confirmation/re-capture.
-   Database unavailable → no fabricated candidate or price.
-   Unverified price → no savings claim.
-   No safe candidate → return `NONE` / "could not verify" and offer
    manual search or pharmacist confirmation.

------------------------------------------------------------------------

## 15. Evaluation plan and release gates

A production-quality evaluation should use a labelled, versioned set of
**at least 50--100 real medicine-pack photos** collected without patient
data and with ground truth reviewed carefully.

### Required metrics

-   Per-field extraction accuracy: brand, composition, strength, form,
    release type, route, and price/expiry where applicable.
-   Brand resolver top-1 and top-3 recall.
-   Exact-match precision and number of false `EXACT` results.
-   Failure and abstention rate by image condition and missing field.
-   Latency p50 and p95.
-   Provider cost per scan.
-   Error taxonomy: ingredient error, missing combination ingredient,
    strength/unit error, release mismatch, OCR/VLM disagreement, wrong
    pack/price, and image-quality false acceptance/rejection.

### Release-blocking rules

-   **Zero false `EXACT` results on the release-blocking golden set.**
    Any false exact match blocks release until investigated and fixed.
-   Never improve recall by weakening equivalence rules.
-   Never tune thresholds on the held-out final test set.
-   Re-run evaluation when prompts, models, normalization rules,
    catalogue data, or thresholds change.
-   Publish limitations alongside results; a small benchmark cannot
    establish universal clinical safety.

### Current status

The reported 30-query resolver benchmark is an early retrieval check. A
complete labelled-photo evaluation with a live vision provider, OCR
cross-check, end-to-end latency, and cost measurements remains
outstanding.

------------------------------------------------------------------------

## 16. Known limitations and unfinished work

1.  **No live vision provider confirmed.** The current extractor is a
    mock used to exercise the pipeline.
2.  **OCR cross-check is not confirmed integrated end to end.**
3.  **Barcode/QR support is planned, not confirmed implemented.**
4.  **Full scan API orchestration is pending in the latest report.**
5.  **No 50--100-photo golden evaluation has been reported.**
6.  **The resolver benchmark is small and curated.** Its scores should
    not be described as general real-world model accuracy.
7.  **Catalogue coverage is limited.** Only 167 Jan Aushadhi rows were
    reported eligible for exact matching in the current audit; 1,347
    accepted rows had unknown release markers and were not eligible for
    exact matching.
8.  **Commercial price freshness is unverified.** Such prices must not
    drive current savings claims.
9.  **NTI (narrow therapeutic index) flags are deferred** until an
    authoritative, reviewed source is available.
10. **Vector search, model training/fine-tuning, and a production
    metrics dashboard are deferred** until a measured need exists.
11. **Deployment/load-test results are not yet established.** Free
    hosting does not guarantee 10,000 simultaneous scans or zero
    latency.
12. **Runtime compatibility must be rechecked** on the exact
    Python/deployment image used for the demo.

------------------------------------------------------------------------

## 17. Roadmap

### Immediate next steps

-   Integrate a real vision-capable provider behind the existing
    extractor interface.
-   Add OCR cross-check and explicit conflict reconciliation for
    critical fields.
-   Build the FastAPI scan orchestration and test the actual multipart
    request/JSON response.
-   Verify provider timeout, malformed output, database outage, and
    rate-limit behavior.
-   Re-run all tests from a clean environment.

### Before claiming model accuracy

-   Label 50--100+ medicine-pack photos with verified ground truth.
-   Evaluate each field separately.
-   Report top-1/top-3 retrieval, false exact matches, abstention rate,
    latency, and cost.
-   Keep a held-out test set untouched during tuning.

### Later, only if measured evidence supports it

-   Barcode/QR decoding.
-   Vector retrieval if it demonstrably improves candidate recall
    without weakening the safety boundary.
-   Reviewed narrow-therapeutic-index data.
-   Monitoring dashboards, load testing, caching, and horizontal
    scaling.
-   On-device OCR or model optimization if latency/cost justify the
    engineering effort.

------------------------------------------------------------------------

## 18. Suggested PPT narrative

Use the following sequence to explain the ML contribution clearly to
judges.

### Slide 1 --- The technical challenge

Medicine names are easy to misread; brand names hide compositions; small
packaging text and release markers can make unsafe comparisons likely.

### Slide 2 --- Our ML pipeline

Image quality gate → structured extraction → normalization → evidence
reconciliation → candidate retrieval → deterministic matcher →
result/abstention.

### Slide 3 --- Why AI alone is not enough

The vision model reads text; verified catalogue evidence and
deterministic rules decide equivalence. Fuzzy similarity or an LLM never
decides `EXACT`.

### Slide 4 --- Safety by design

Unknown stays unknown. Missing strength, incomplete composition,
conflicting images, or unknown release type block exact matching. No
fabricated prices or savings.

### Slide 5 --- Data and catalogue quality

Explain the Jan Aushadhi ETL, accepted/quarantined records, source
provenance, and why unknown release markers prevent exact matching. Be
clear that the commercial dataset was only sample-audited and prices are
unverified.

### Slide 6 --- Engineering validation

Show the reported 218 cumulative passing tests and what they cover,
labelled explicitly as the development report's test result. Explain the
small 30-query retrieval benchmark and its limitations.

### Slide 7 --- What is built vs next

Built: schemas, normalization, deterministic matcher, audited ETL,
candidate resolver, image-quality gate, mock extractor, multi-image
conflict gate.\
Next: live vision provider, OCR cross-check, full `/v1/scan` API
integration, and golden-set evaluation.

### Slide 8 --- Reliability and scale

One shared backend/model pipeline serves requests; model is not copied
per user. Scale depends on inference provider quotas, server capacity,
concurrency controls, and measured load tests.

------------------------------------------------------------------------

## 19. Judge Q&A --- concise, defensible answers

**Q: Does the AI decide whether two medicines are equivalent?**\
No. AI extracts visible fields. A deterministic matcher compares the
complete required ingredient set, strength/denominator, dosage form,
release type, route, and relevant salt distinctions. If evidence is
missing or conflicting, we abstain.

**Q: What if the image is blurry?**\
The quality gate flags it and gives retake guidance. It does not guess
unreadable fields.

**Q: What if two photos contradict each other?**\
The reconciliation layer flags critical conflicts and blocks automatic
exact matching.

**Q: Is this trained on thousands of medicine images?**\
Do not claim that. The current reported implementation uses a mock
extractor for offline tests; a live vision provider and a labelled photo
evaluation are still pending.

**Q: What does 218 tests passed mean?**\
It is the cumulative test count reported by the implementation run,
covering schemas, normalization, matching, ETL, retrieval, image
validation, reconciliation, and fail-closed integration. It is software
test coverage, not 218 real-world clinical validations.

**Q: How accurate is the resolver?**\
The current report shows 83.33% top-1 and 100% top-3 on a curated
30-query benchmark. This is an early retrieval benchmark, not a clinical
accuracy claim. The held-out split contains only 15 queries.

**Q: Can the app show cheaper prices if the source is stale?**\
No. Price provenance and comparability are separate gates. Unverified or
stale prices must not produce savings claims.

**Q: Can it serve many users?**\
The architecture supports a shared inference service, but capacity is
not yet proven. We must load-test the actual provider/backend
combination and respect rate limits and cost.

**Q: Does it replace a doctor or pharmacist?**\
No. It supports medicine information discovery only. Users must confirm
any change with a doctor or pharmacist.

------------------------------------------------------------------------

## 20. Final summary

Sasti Dawai's ML contribution is not just image-to-text extraction. It
is a **safety-oriented pipeline** that preserves uncertainty, cleans and
audits catalogue data, retrieves candidates, and enforces deterministic
equivalence boundaries.

The strongest defensible technical message is:

> **We separate reading from deciding. The AI extracts what the package
> says; our verified catalogue and deterministic safety rules decide
> whether the evidence supports an exact match. If it does not, the
> system abstains.**

Always confirm with your doctor or pharmacist.
