/**
 * skills-hud.js — v2 (Active Telemetry Edition)
 * Controls the interactive digital diagnostic HUD console.
 * When hovering over a skill node, it decodes hex arrays,
 * outputs telemetry status lines, and animates system logs.
 * When idle, it streams scrolling background system logs.
 */
(function () {
  'use strict';

  const terminal = document.getElementById('skills-terminal-output');
  if (!terminal) return;

  const skillNodes = document.querySelectorAll('.skill-node');

  // Default terminal text
  const defaultLogs = [
    '<span class="term-cyan">></span> SYSTEM STATUS: OPERATIONAL',
    '<span class="term-cyan">></span> DATASTREAM: ONLINE',
    '<span class="term-cyan">></span> HOVER OVER A SKILL NODE TO INITIATE DECODING...',
    '<span class="term-muted">> [Awaiting input telemetry]</span>'
  ];

  const idleLogsList = [
    "LOG: CACHE_REFRESH_SUCCESSFUL (addr: 0x7FF01A)",
    "DATA: NLP_LAYER_CALIBRATED (v_factor: 0.982)",
    "NET: OUTBOUND_PING_STABLE (lat: 14ms)",
    "CORE: ML_WEIGHTS_COMPACTED (size: 2.4GB)",
    "SYS: INTEGRITY_MONITOR_PASS (checksum: OK)",
    "DECRYPT: ENCRYPTED_VAULT_NODE_DETECTED (0x09_BPL)",
    "LOG: SYSTEM_CYCLES_BALANCED (cpu_load: 18%)",
    "NET: API_ENDPOINT_CALIBRATED (httpx: 200_OK)",
    "CORE: LLM_CONTEXT_MAP_STABLE (llama3: operational)"
  ];

  let typingTimeout = null;
  let idleInterval = null;

  function resetTerminal() {
    if (typingTimeout) clearTimeout(typingTimeout);
    terminal.innerHTML = '';
    defaultLogs.forEach(line => {
      const div = document.createElement('div');
      div.className = 'terminal-line';
      div.innerHTML = line;
      terminal.appendChild(div);
    });
    startIdleTelemetry();
  }

  function startIdleTelemetry() {
    if (idleInterval) clearInterval(idleInterval);
    idleInterval = setInterval(() => {
      // Don't log if user is currently hovering a node
      const isHovered = Array.from(skillNodes).some(node => node.matches(':hover'));
      if (isHovered) return;

      const randomLog = idleLogsList[Math.floor(Math.random() * idleLogsList.length)];
      
      // Limit to max 7 lines in console
      if (terminal.children.length >= 7) {
        terminal.removeChild(terminal.firstElementChild);
      }

      const div = document.createElement('div');
      div.className = 'terminal-line';
      div.innerHTML = `<span class="term-cyan">></span> <span class="term-muted">[SYS_LOG]</span> ${randomLog}`;
      terminal.appendChild(div);

      // Auto scroll to bottom
      terminal.scrollTop = terminal.scrollHeight;
    }, 1800);
  }

  function formatHex(str) {
    return str.split(' ').map(hex => `<span class="term-hex">${hex}</span>`).join(' ');
  }

  function decodeEffect(text, targetElement, callback) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()';
    let iterations = 0;
    const interval = setInterval(() => {
      targetElement.innerHTML = text
        .split('')
        .map((char, index) => {
          if (index < iterations) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iterations >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
      iterations += 1;
    }, 15);
  }

  skillNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      // Pause idle logs
      if (idleInterval) clearInterval(idleInterval);

      const skillName = node.getAttribute('data-skill');
      const level = node.getAttribute('data-level');
      const category = node.getAttribute('data-category');
      const desc = node.getAttribute('data-desc');
      const status = node.getAttribute('data-status') || 'ACTIVE';
      const hex = node.getAttribute('data-hex') || '0x00 0x00 0x00 0x00';

      if (typingTimeout) clearTimeout(typingTimeout);

      // Clear console screen
      terminal.innerHTML = '';

      // Create lines
      const line1 = document.createElement('div');
      line1.className = 'terminal-line';
      line1.innerHTML = `<span class="term-cyan">></span> MODULE: <span class="term-cyan term-bold"></span>`;
      terminal.appendChild(line1);

      const line2 = document.createElement('div');
      line2.className = 'terminal-line';
      line2.innerHTML = `<span class="term-cyan">></span> INTEGRITY: <span class="term-purple">${level}</span>`;
      terminal.appendChild(line2);

      const line3 = document.createElement('div');
      line3.className = 'terminal-line';
      line3.innerHTML = `<span class="term-cyan">></span> LAYER: <span class="term-green">${category}</span>`;
      terminal.appendChild(line3);

      const line4 = document.createElement('div');
      line4.className = 'terminal-line';
      line4.innerHTML = `<span class="term-cyan">></span> HEX SIGN: ${formatHex(hex)}`;
      terminal.appendChild(line4);

      const line5 = document.createElement('div');
      line5.className = 'terminal-line';
      line5.innerHTML = `<span class="term-cyan">></span> STATUS: <span class="term-status-pill term-${status.toLowerCase()}">${status}</span>`;
      terminal.appendChild(line5);

      const line6 = document.createElement('div');
      line6.className = 'terminal-line term-desc-line';
      line6.innerHTML = `<span class="term-muted">> DESCRIPTION: </span><span class="term-text-wrap"></span>`;
      terminal.appendChild(line6);

      // Decode animation for Name
      const nameContainer = line1.querySelector('.term-bold');
      decodeEffect(skillName, nameContainer, () => {
        // After name finishes decoding, decode the description
        const descContainer = line6.querySelector('.term-text-wrap');
        decodeEffect(desc, descContainer);
      });
    });

    node.addEventListener('mouseleave', () => {
      resetTerminal();
    });
  });

  // Init
  resetTerminal();
})();
