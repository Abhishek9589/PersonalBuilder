import React from 'react';
import { CustomSection, CustomSectionData, FieldType } from '@/pages/Builder';



function FieldRenderer({ field, value, fontSize = 12 }) {
  if (!value || value === '') return null;

  const renderValue = () => {
    switch (field.type) {
      case 'url':
        return (
          <a
            href={value.startsWith('http') ? value : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline cursor-pointer"
          >
            {value}
          </a>
        );

      case 'email':
        return (
          <a
            href={`mailto:${value}`}
            className="text-black hover:underline cursor-pointer"
          >
            {value}
          </a>
        );

      case 'phone':
        return (
          <a
            href={`tel:${value}`}
            className="text-black hover:underline cursor-pointer"
          >
            {value}
          </a>
        );

      case 'rating':
        const maxRating = field.maxRating || 5;
        const rating = Math.min(Math.max(parseInt(value) || 0, 0), maxRating);
        return (
          <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, i) => (
              <span key={i} className="text-black">
                {i < rating ? '★' : '☆'}
              </span>
            ))}
            <span className="ml-1 text-black">({rating}/{maxRating})</span>
          </div>
        );

      case 'tags':
        const tags = Array.isArray(value) ? value : value.split(',').map((t) => t.trim());
        return (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-black text-xs rounded"
                style={{ fontSize: `${fontSize * 0.8}px` }}
              >
                {tag}
              </span>
            ))}
          </div>
        );

      case 'bullets':
        const bullets = Array.isArray(value) ? value : value.split('\n').filter((b) => b.trim());
        return (
          <ul className="text-black list-disc list-inside space-y-0" style={{ fontSize: `${fontSize * 0.9}px` }}>
            {bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        );

      case 'textarea':
        const lines = value.split('\n').filter((line) => line.trim());
        return (
          <div className="text-black space-y-1">
            {lines.map((line, index) => (
              <p key={index} style={{ fontSize: `${fontSize * 0.9}px` }}>
                {line}
              </p>
            ))}
          </div>
        );

      case 'date':
        try {
          const date = new Date(value);
          return <span className="text-black">{date.toLocaleDateString()}</span>;
        } catch {
          return <span className="text-black">{value}</span>;
        }

      case 'text':
      case 'number':
      case 'select':
      default:
        return <span className="text-black">{value}</span>;
    }
  };

  return (
    <div className="space-y-1">
      <div className="text-black font-medium" style={{ fontSize: `${fontSize * 0.9}px` }}>
        {field.label}:
      </div>
      <div>{renderValue()}</div>
    </div>
  );
}

export default function CustomSectionRenderer({
  section,
  fontFamily,
  fontSize = 12
}) {
  if (section.data.length === 0) {
    return null;
  }

  const renderLayout = () => {
    switch (section.layout) {
      case 'single-column':
        return (
          <div className="space-y-3">
            {section.data.map((entry, entryIndex) => (
              <div key={entryIndex} className="space-y-2">
                {section.fields.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    value={entry[field.id]}
                    fontSize={fontSize}
                  />
                ))}
                {entryIndex < section.data.length - 1 && (
                  <hr className="border-gray-300 my-2" />
                )}
              </div>
            ))}
          </div>
        );

      case 'two-column':
        return (
          <div className="space-y-3">
            {section.data.map((entry, entryIndex) => (
              <div key={entryIndex}>
                <div className="grid grid-cols-2 gap-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={field.id} className={fieldIndex % 2 === 0 ? '' : ''}>
                      <FieldRenderer
                        field={field}
                        value={entry[field.id]}
                        fontSize={fontSize}
                      />
                    </div>
                  ))}
                </div>
                {entryIndex < section.data.length - 1 && (
                  <hr className="border-gray-300 my-3" />
                )}
              </div>
            ))}
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-2">
            {section.data.map((entry, entryIndex) => (
              <div key={entryIndex} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  {entryIndex < section.data.length - 1 && (
                    <div className="w-px h-8 bg-gray-300 mt-1"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  {section.fields.map((field) => (
                    <FieldRenderer
                      key={field.id}
                      field={field}
                      value={entry[field.id]}
                      fontSize={fontSize}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.data.map((entry, entryIndex) => (
              <div key={entryIndex} className="border border-gray-200 rounded p-3 space-y-2">
                {section.fields.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    value={entry[field.id]}
                    fontSize={fontSize}
                  />
                ))}
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            {section.data.map((entry, entryIndex) => (
              <div key={entryIndex} className="space-y-1">
                {section.fields.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    value={entry[field.id]}
                    fontSize={fontSize}
                  />
                ))}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="mb-3">
      <h2 
        className="font-bold text-black mb-1 uppercase tracking-wider" 
        style={{ 
          fontSize: `${fontSize * 1.1}px`,
          fontFamily: fontFamily 
        }}
      >
        {section.name}
      </h2>
      <hr className="border-black mb-1" />
      <div style={{ fontFamily: fontFamily }}>
        {renderLayout()}
      </div>
    </div>
  );
}
