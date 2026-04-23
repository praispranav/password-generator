import { useMemo, useState } from 'react'
import './App.css'

const PRESET_TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    keys: [
      { id: 1, value: '1', label: 'AB' },
      { id: 2, value: '2', label: 'EF' },
      { id: 3, value: '3', label: 'G' },
      { id: 4, value: '4', label: 'JK' },
      { id: 5, value: '5', label: 'OP' },
      { id: 6, value: '6', label: 'QR' },
      { id: 7, value: '7', label: 'SU' },
      { id: 8, value: '8', label: 'WX' },
      { id: 9, value: '9', label: 'YZ' },
      { id: 10, value: '0', label: 'LM' },
      { id: 11, value: '+', label: 'HI' },
      { id: 11, value: '+', label: 'T' },
      { id: 11, value: '+', label: '&*#' },
    ],
  },
  {
    id: 'vowels',
    name: 'Vowels',
    keys: [
      { id: 1, value: '1', label: 'AE' },
      { id: 2, value: '2', label: 'IO' },
      { id: 3, value: '3', label: 'UY' },
      { id: 4, value: '4', label: 'AA' },
      { id: 5, value: '5', label: 'EE' },
      { id: 6, value: '6', label: 'II' },
      { id: 7, value: '7', label: 'OO' },
      { id: 8, value: '8', label: 'UU' },
      { id: 9, value: '9', label: 'YY' },
    ],
  },
  {
    id: 'pairs',
    name: 'Pairs',
    keys: [
      { id: 1, value: '1', label: 'BV' },
      { id: 2, value: '2', label: 'DM' },
      { id: 3, value: '3', label: 'FP' },
      { id: 4, value: '4', label: 'GT' },
      { id: 5, value: '5', label: 'HK' },
      { id: 6, value: '6', label: 'LR' },
      { id: 7, value: '7', label: 'NS' },
      { id: 8, value: '8', label: 'QW' },
      { id: 9, value: '9', label: 'XZ' },
      { id: 10, value: '0', label: '00' },
    ],
  },
]

const OPERATION_KEYS = []

function App() {
  const [displayValue, setDisplayValue] = useState('')
  const [activeTemplateId, setActiveTemplateId] = useState(PRESET_TEMPLATES[0].id)
  const [keypadPresets, setKeypadPresets] = useState(PRESET_TEMPLATES[0].keys)

  const visibleKeys = useMemo(() => keypadPresets.slice(0, 9), [keypadPresets])

  const appendToDisplay = (text) => {
    setDisplayValue((current) => `${current}${text}`)
  }

  const applyTemplate = (templateId) => {
    const selectedTemplate = PRESET_TEMPLATES.find(
      (template) => template.id === templateId,
    )
    if (!selectedTemplate) return

    setActiveTemplateId(templateId)
    setKeypadPresets(selectedTemplate.keys)
  }

  const handlePresetLabelChange = (id, updatedLabel) => {
    setKeypadPresets((currentPresets) =>
      currentPresets.map((preset) =>
        preset.id === id ? { ...preset, label: updatedLabel } : preset,
      ),
    )
  }

  return (
    <main className="keypad-page">
      <section className="keypad-card">
        <h1 className="keypad-title">Phone Keypad</h1>

        <input
          type="text"
          className="display-input"
          value={displayValue}
          onChange={(event) => setDisplayValue(event.target.value)}
          placeholder="Type here or use keypad"
          aria-label="Keypad output"
        />

        <section className="template-controls" aria-label="Template presets">
          <label className="template-select-wrap">
            <span className="template-label">Preset template</span>
            <select
              className="template-select"
              value={activeTemplateId}
              onChange={(event) => applyTemplate(event.target.value)}
              aria-label="Select keypad preset template"
            >
              {PRESET_TEMPLATES.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="template-reset-button"
            onClick={() => applyTemplate(activeTemplateId)}
          >
            Reset template
          </button>
        </section>

        <div className="key-grid" role="group" aria-label="Number keypad">
          {visibleKeys.map((key) => (
            <button
              type="button"
              key={key.id}
              className="key-button"
              onClick={() => appendToDisplay(key.value)}
            >
              <span className="key-number">{key.value}</span>
              <span className="key-label">{key.label}</span>
            </button>
          ))}
        </div>

        <div className="operator-row" role="group" aria-label="Operations">
          {OPERATION_KEYS.map((operator) => (
            <button
              type="button"
              key={operator}
              className="operator-button"
              onClick={() => appendToDisplay(operator)}
            >
              {operator}
            </button>
          ))}
        </div>

      </section>
    </main>
  )
}

export default App
