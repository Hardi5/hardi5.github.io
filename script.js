/* SentinelForge Interactive Map Logic */

document.addEventListener('DOMContentLoaded', () => {
    // --- Data Structure ---
    const graphData = {
        nodes: [
            // CORE
            { id: "core", group: "core", label: "SentinelForge CORE", r: 35, 
              title: "SentinelForge Core",
              content: "<h3>AI-Powered Cyber Range</h3><p>Eliminates the gap between training and reality using AI to generate real, vulnerable cloud environments on GCP.</p><ul><li>Real Infrastructure (Terraform/GCP)</li><li>4 Specialized AI Brains</li><li>Red & Blue Team Modes</li></ul>",
              cmd: "gcloud services enable sentinelforge.googleapis.com"
            },
            
            // MAIN BRANCHES
            { id: "ai_brains", group: "category", label: "AI Brains", r: 25,
              title: "The 4 AI Brains",
              content: "<h3>Orchestration System</h3><p>Four specialized AI systems work in concert to build worlds, mentor users, and fix infrastructure.</p>",
              cmd: "sentinelforge ai status --all"
            },
            { id: "red_team", group: "category", label: "Red Team", r: 25, tag: "red",
              title: "Red Team Mode",
              content: "<h3>Offensive Security Training</h3><p>Attack real cloud infrastructure with AI guidance. No simulations.</p><ul><li>Misconfigured IAM & Buckets</li><li>Container Escapes</li><li>Lateral Movement</li></ul>",
              cmd: "sentinelforge mode set red"
            },
            { id: "blue_team", group: "category", label: "Blue Team", r: 25, tag: "blue",
              title: "Blue Team Mode",
              content: "<h3>Defensive Operations</h3><p>Investigate real attacks using cloud-native logs and tools.</p><ul><li>Cloud Logging & Audit Logs</li><li>VPC Flow Logs</li><li>Threat Hunting</li></ul>",
              cmd: "sentinelforge mode set blue"
            },
            { id: "architecture", group: "category", label: "Architecture", r: 25,
              title: "Technical Architecture",
              content: "<h3>Cloud-Native Stack</h3><p>Built entirely on Google Cloud Platform using modern IaC.</p>",
              cmd: "terraform plan"
            },
            
            // AI BRAINS CHILDREN
            { id: "scenario_architect", group: "item", label: "Scenario Architect", parent: "ai_brains",
              title: "Scenario Architect AI",
              content: "<h3>The Worldbuilder</h3><p>Generates entire cyberworlds from scratch.</p><ul><li>Writes Terraform & Ansible</li><li>Plants Vulnerabilities</li><li>Creates Attack Paths</li></ul>",
              cmd: "sentinelforge generate scenario --difficulty=hard"
            },
            { id: "hack_buddy", group: "item", label: "Hack Buddy", parent: "ai_brains", tag: "red",
              title: "Hack Buddy AI",
              content: "<h3>Offensive Coach</h3><p>Monitors attack progress and provides hints without spoilers.</p><ul><li>Reconnaissance Hints</li><li>Exploit Explanation</li><li>Methodology Teaching</li></ul>",
              cmd: "hackbuddy hint --current-step"
            },
            { id: "soc_buddy", group: "item", label: "SOC Buddy", parent: "ai_brains", tag: "blue",
              title: "SOC Buddy AI",
              content: "<h3>Defensive Mentor</h3><p>Guides log analysis and incident response.</p><ul><li>Log Source Pointers</li><li>Query Suggestions</li><li>TTP Explanation (MITRE ATT&CK)</li></ul>",
              cmd: "socbuddy analyze --source=cloud-logging"
            },
            { id: "fix_mode", group: "item", label: "Fix Mode", parent: "ai_brains",
              title: "Fix Mode AI",
              content: "<h3>Remediation Engineer</h3><p>Analyzes incidents and generates fixes.</p><ul><li>Hardened Terraform</li><li>Security Patches</li><li>Least Privilege IAM Configs</li></ul>",
              cmd: "sentinelforge fix --apply"
            },

            // RED TEAM CHILDREN
            { id: "recon", group: "item", label: "Reconnaissance", parent: "red_team", tag: "red",
              title: "Reconnaissance Phase",
              content: "<p>Scanning for exposed buckets, public endpoints, and OSint.</p>",
              cmd: "nmap -sV -p- <target-ip>"
            },
            { id: "exploitation", group: "item", label: "Exploitation", parent: "red_team", tag: "red",
              title: "Exploitation Phase",
              content: "<p>Leveraging misconfigurations and vulnerabilities to gain access.</p>",
              cmd: "curl -X POST http://vulnerable-app/api/upload"
            },
            { id: "priv_esc", group: "item", label: "PrivEsc", parent: "red_team", tag: "red",
              title: "Privilege Escalation",
              content: "<p>Moving from web-user to root, or Service Account to Project Owner.</p>",
              cmd: "gcloud projects add-iam-policy-binding ..."
            },

            // BLUE TEAM CHILDREN
            { id: "log_analysis", group: "item", label: "Log Analysis", parent: "blue_team", tag: "blue",
              title: "Log Analysis",
              content: "<p>Ingesting and querying logs from Cloud Logging, Audit Logs, and Flow Logs.</p>",
              cmd: 'gcloud logging read "resource.type=gce_instance"'
            },
            { id: "timeline", group: "item", label: "Timeline", parent: "blue_team", tag: "blue",
              title: "Attack Timeline",
              content: "<p>Reconstructing the sequence of events to understand the breach.</p>",
              cmd: "timesketch import --file=plaso.dump"
            },
            { id: "ioc", group: "item", label: "IOCs", parent: "blue_team", tag: "blue",
              title: "Indicators of Compromise",
              content: "<p>Extracting IPs, hashes, and user agents to block and track.</p>",
              cmd: "grep 'Failed password' /var/log/auth.log"
            },

            // ARCHITECTURE CHILDREN
            { id: "gcp", group: "item", label: "Google Cloud", parent: "architecture",
              title: "GCP Infrastructure",
              content: "<p>The bedrock of the range. GKE, Compute Engine, VPC, Cloud SQL.</p>",
              cmd: "gcloud compute instances list"
            },
            { id: "iac", group: "item", label: "IaC Pipeline", parent: "architecture",
              title: "Infrastructure as Code",
              content: "<p>Terraform and Ansible code generated on the fly by AI.</p>",
              cmd: "terraform apply -auto-approve"
            },
            { id: "vertex", group: "item", label: "Vertex AI", parent: "architecture",
              title: "Vertex AI Integration",
              content: "<p>Powering the 4 AI brains with enterprise-grade LLMs.</p>",
              cmd: "# Backend orchestration logic"
            },
            
            // ROADMAP
            { id: "roadmap", group: "category", label: "Roadmap", r: 25,
              title: "Project Roadmap",
              content: "<h3>Future Plans</h3><ul><li>Phase 2: Windows & Hybrid</li><li>Phase 3: Team vs Team</li><li>Phase 4: Enterprise & Education</li></ul>",
              cmd: "cat ROADMAP.md"
            }
        ],
        links: [
            { source: "core", target: "ai_brains" },
            { source: "core", target: "red_team" },
            { source: "core", target: "blue_team" },
            { source: "core", target: "architecture" },
            { source: "core", target: "roadmap" },
            
            { source: "ai_brains", target: "scenario_architect" },
            { source: "ai_brains", target: "hack_buddy" },
            { source: "ai_brains", target: "soc_buddy" },
            { source: "ai_brains", target: "fix_mode" },
            
            { source: "red_team", target: "recon" },
            { source: "red_team", target: "exploitation" },
            { source: "red_team", target: "priv_esc" },
            
            { source: "blue_team", target: "log_analysis" },
            { source: "blue_team", target: "timeline" },
            { source: "blue_team", target: "ioc" },
            
            { source: "architecture", target: "gcp" },
            { source: "architecture", target: "iac" },
            { source: "architecture", target: "vertex" },

            // Cross Links
            { source: "hack_buddy", target: "red_team", value: 0.5 },
            { source: "soc_buddy", target: "blue_team", value: 0.5 },
            { source: "scenario_architect", target: "iac", value: 0.5 }
        ]
    };

    // --- Setup ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // D3 Elements
    const svg = d3.select("#viz-container").append("svg")
        .attr("viewBox", [0, 0, width, height]);
        
    const g = svg.append("g"); // Container for zoom/pan

    // Zoom support
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
        });
        
    svg.call(zoom);

    // Simulation
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => d.r + 10).iterations(2));

    // Draw Links
    const link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("class", "link");

    // Draw Nodes
    const node = g.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graphData.nodes)
        .join("g")
        .attr("class", d => `node type-${d.group} ${d.tag ? 'tag-' + d.tag : ''}`)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Node Circles
    node.append("circle")
        .attr("r", d => d.r);

    // Node Labels
    node.append("text")
        .attr("dy", d => d.r + 15)
        .attr("text-anchor", "middle")
        .text(d => d.label);

    // --- Interaction Logic ---
    
    // Panel Elements
    const panel = document.getElementById('detail-panel');
    const panelTitle = document.getElementById('panel-title');
    const panelBody = document.getElementById('panel-body');
    const cmdPreview = document.getElementById('cmd-preview');
    const closeBtn = document.getElementById('close-panel');
    const nodeCountEl = document.getElementById('node-count');

    // Update Stats
    nodeCountEl.textContent = graphData.nodes.length;

    // Click Handler
    node.on("click", (event, d) => {
        event.stopPropagation(); // Prevent map click from closing
        openPanel(d);
    });

    svg.on("click", () => {
        closePanel();
    });

    function openPanel(d) {
        panelTitle.textContent = d.title || d.label;
        panelBody.innerHTML = d.content || "<p>No details available.</p>";
        
        // Typewriter effect for terminal
        if (d.cmd) {
            typewriter(d.cmd, cmdPreview);
        } else {
            cmdPreview.textContent = "# ...";
        }
        
        panel.classList.remove('hidden');
    }

    function closePanel() {
        panel.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closePanel);
    
    // Typewriter Utility
    let typeInterval;
    function typewriter(text, element) {
        clearInterval(typeInterval);
        element.textContent = "> ";
        let i = 0;
        typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    }

    // Reset View
    document.getElementById('reset-view').addEventListener('click', () => {
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity,
            d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
        simulation.alpha(1).restart();
    });

    // Mode Switching
    const modeBtns = document.querySelectorAll('.mode-btn');
    
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Update
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const mode = btn.dataset.mode;
            updateMode(mode);
        });
    });

    function updateMode(mode) {
        // Reset classes
        d3.selectAll('.node').classed('dimmed', false).classed('highlight-red', false).classed('highlight-blue', false);
        d3.selectAll('.link').classed('dimmed', false).classed('highlight-red', false).classed('highlight-blue', false);

        if (mode === 'hybrid') {
            // Show all, standard colors
            return;
        }

        // Dim everything first
        d3.selectAll('.node').classed('dimmed', true);
        d3.selectAll('.link').classed('dimmed', true);

        if (mode === 'red') {
            // Highlight red tagged nodes and core
            d3.selectAll('.node.tag-red, .node.type-core').classed('dimmed', false).classed('highlight-red', true);
            // Highlight links connected to red nodes
            d3.selectAll('.link').filter(l => 
                (l.source.tag === 'red' || l.target.tag === 'red') || 
                (l.source.id === 'core' && l.target.id === 'red_team')
            ).classed('dimmed', false).classed('highlight-red', true);
        } 
        else if (mode === 'blue') {
            // Highlight blue tagged nodes and core
            d3.selectAll('.node.tag-blue, .node.type-core').classed('dimmed', false).classed('highlight-blue', true);
             // Highlight links connected to blue nodes
             d3.selectAll('.link').filter(l => 
                (l.source.tag === 'blue' || l.target.tag === 'blue') || 
                (l.source.id === 'core' && l.target.id === 'blue_team')
            ).classed('dimmed', false).classed('highlight-blue', true);
        }
    }

    // Ticker Loop
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Drag Functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // Handle Window Resize
    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        svg.attr("viewBox", [0, 0, w, h]);
        simulation.force("center", d3.forceCenter(w / 2, h / 2));
        simulation.alpha(0.3).restart();
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    // (Optional: Add logic if we had a full mobile menu overlay)
    
    // Initial simple mode
    updateMode('hybrid');
});
