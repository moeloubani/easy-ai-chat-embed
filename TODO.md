# Easy AI Chat Embed - TODO List

## Core Functionality

- [x] **Frontend Chat Interface (Block):**
    - [x] Create `src/frontend.js` entry point.
    - [x] Add logic to find block container div (`.wp-block-easy-ai-chat-embed-chat-embed`) and extract data attributes.
    - [x] Configure and mount `react-chatbot-kit` within the container (basic mount done).
    - [ ] Implement `MessageParser` to handle user input.
    - [ ] Implement `ActionProvider` to send messages to backend API via AJAX.
    - [ ] Handle conversation history state within the component.
    - [ ] Style the chat widget (using `react-chatbot-kit` props and potentially CSS overrides).
    - [x] Enqueue `frontend.js` and dependencies (React, ReactDOM, `react-chatbot-kit` CSS) only when the block/shortcode is present.
- [x] **Backend API Handling:**
    - [x] Create PHP AJAX handler (`includes/api/handler.php`).
    - [x] Implement logic to receive messages, identify model, prepend initial prompt (basic handling done).
    - [x] Make API calls to selected AI service (OpenAI, Anthropic, & Google implemented).
    - [x] Handle API responses and errors (OpenAI, Anthropic, & Google implemented).
    - [x] Return AI response to the frontend (OpenAI, Anthropic, & Google implemented).
    - [x] Add nonce verification for security (implemented).
- [ ] **Admin Settings Page:**
    - [x] Create settings page (`admin/settings.php`).
    - [x] Add fields for global API Keys (OpenAI, Anthropic, Google).
    - [x] Add fields for default model selection and default initial prompt.
    - [x] Save and sanitize settings using the Settings API.
    - [x] Load settings where needed (API handler implemented, Shortcode handler implemented).
    - [ ] Display errors if API key is missing for a selected model.
- [x] **Shortcode Implementation:**
    - [x] Create shortcode handler (`easy_ai_chat_embed_shortcode_handler` in main plugin file).
    - [x] Define shortcode attributes (basic `$atts` processing added).
    - [x] Output container div similar to the block's `save.js`.
    - [x] Ensure `frontend.js` also targets and mounts chat for shortcode instances.
    - [x] Handle default settings fallback (using localized data).
- [ ] **Elementor Widget Implementation:**
    - [x] Create Elementor widget class (`includes/elementor/widget.php`).
    - [x] Register the widget (`includes/elementor/loader.php` & main plugin file check).
    - [x] Add widget controls (model selection, initial prompt).
    - [x] Render the container div similar to block/shortcode.
    - [x] Ensure `frontend.js` also targets and mounts chat for Elementor instances (via shared class).
    - [x] Handle default settings fallback (within render method).
- [ ] **Frontend Script Updates:**
    - [x] Update `frontend.js` selector to target both block and shortcode containers.
    - [x] Add logic in `frontend.js` to differentiate block/shortcode and extract/set data accordingly.
    - [x] Implement `src/chatbot/config.js`.
    - [x] Implement `src/chatbot/MessageParser.js`.
    - [x] Implement `src/chatbot/ActionProvider.js` (including basic AJAX call).

## Refinements & Extras

- [ ] **Styling:**
    - [x] Refine chat widget styles (basic overrides added to `frontend.scss`).
    - [ ] Ensure consistent look across block, shortcode, and widget.
- [x] **Error Handling:**
    - [x] Improve frontend display of API errors (basic text prepend).
    - [x] Add visual feedback during API calls (e.g., loading indicator - implemented).
- [ ] **Security:**
    - [x] Review data sanitization and escaping (looks generally adequate).
    - [x] Harden AJAX endpoint (nonce verification implemented, capabilities check added).
- [x] **Internationalization (i18n):**
    - [x] Ensure all user-facing strings are translatable (including translator comments).
    - [x] Generate `.pot` file.
- [ ] **Documentation:**
    - [x] Update `README.md` with usage instructions.
    - [ ] Add inline code comments where necessary.
- [ ] **Testing:**
    - [ ] Manual testing in different themes/environments.
    - [ ] (Optional) Add automated tests (Unit, E2E). 