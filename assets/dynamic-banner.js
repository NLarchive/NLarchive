const canvas = document.getElementById("neuralNetworkCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fill the screen dynamically
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Define network nodes and connections
const nodes = [];
const connections = [];
const NUM_NODES = 50;

// Initialize random nodes
function initializeNodes() {
    for (let i = 0; i < NUM_NODES; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 2,
        });
    }
}

// Create connections between nodes
function initializeConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < 0.2) { // 20% chance to connect nodes
                connections.push({ from: i, to: j });
            }
        }
    }
}

// Render nodes
function drawNodes() {
    ctx.fillStyle = "cyan";
    for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Render connections
function drawConnections() {
    ctx.strokeStyle = "rgba(173, 216, 230, 0.2)";
    ctx.lineWidth = 1.5;
    for (const connection of connections) {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
    }
}

// Update node positions
function updateNodes() {
    for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    drawNodes();
    updateNodes();
    requestAnimationFrame(animate);
}

// Initialize and start the animation
initializeNodes();
initializeConnections();
animate();
