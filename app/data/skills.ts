export interface Skill {
  name: string;
  level: number; // 1..5
}

export interface ToolGroup {
  label: string;
  tools: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Classe Tailwind de l'accent (icône + fond) */
  accent: string;
  icon: 'code' | 'layers' | 'shield' | 'server';
  skills: Skill[];
  toolGroups?: ToolGroup[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'langages',
    title: 'Langages de programmation',
    accent: 'blue',
    icon: 'code',
    skills: [
      { name: 'SQL', level: 5 },
      { name: 'HTML / CSS', level: 4 },
      { name: 'PHP', level: 4 },
      { name: 'JavaScript', level: 3 },
      { name: 'Python', level: 3 },
      { name: 'C#', level: 3 },
      { name: 'Rust', level: 3 },
      { name: 'VBA', level: 3 },
      { name: 'C++', level: 2 },
      { name: 'Kotlin', level: 1 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & bibliothèques',
    accent: 'purple',
    icon: 'layers',
    skills: [
      { name: 'Laravel / Filament', level: 4 },
      { name: 'Next.js', level: 3 },
      { name: 'React', level: 3 },
      { name: 'React Native', level: 3 },
      { name: 'Livewire / Alpine.js', level: 3 },
      { name: 'Symfony', level: 2 },
    ],
    toolGroups: [
      { label: 'Autres technologies', tools: ['Tailwind CSS', 'Bootstrap', 'Node.js', 'Express', 'Vite', 'FastAPI'] },
    ],
  },
  {
    id: 'cyber',
    title: 'Cybersécurité',
    accent: 'red',
    icon: 'shield',
    skills: [
      { name: 'Pentest web', level: 5 },
      { name: 'Analyse de vulnérabilités', level: 5 },
      { name: 'Pentest réseau', level: 4 },
      { name: 'Reverse engineering', level: 3 },
    ],
    toolGroups: [
      {
        label: 'Outils de pentest',
        tools: [
          'Burp Suite', 'Nmap', 'SQLMap', 'Nikto', 'Nuclei', 'WPScan', 'Gobuster',
          'Subfinder', 'Wappalyzer', 'Shodan', 'Censys', 'BeEF', 'Hydra',
          'John the Ripper', 'Hashcat', 'Wireshark', 'Kali Linux', 'GitTools',
        ],
      },
      {
        label: 'Reverse engineering / hardware',
        tools: ['Ghidra', 'IDA', 'x64dbg', 'Frida', 'Objection', 'SSL Pinning Bypass', 'RTL-SDR'],
      },
    ],
  },
  {
    id: 'sysops',
    title: 'SysOps / DevOps',
    accent: 'green',
    icon: 'server',
    skills: [
      { name: 'Administration système Linux', level: 4 },
      { name: 'ASRBD (systèmes, réseaux, BDD)', level: 4 },
      { name: 'Docker / conteneurisation', level: 4 },
      { name: 'CI/CD', level: 3 },
      { name: 'Kubernetes', level: 3 },
      { name: 'Terraform', level: 3 },
      { name: 'Administration AD', level: 3 },
    ],
    toolGroups: [
      { label: 'Virtualisation', tools: ['VMware vSphere', 'ESXi', 'Proxmox', 'Hyper-V', 'PXE'] },
      { label: 'Automation & configuration', tools: ['Ansible', 'GitHub Actions', 'GitLab CI/CD', 'Terraform'] },
      { label: 'Réseau & sécurité', tools: ['pfSense', 'UFW', 'OpenVPN', 'Tailscale', 'Fail2ban', 'Wazuh'] },
      { label: 'Monitoring & logs', tools: ['Prometheus', 'Grafana', 'ELK Stack', 'Zabbix', 'Redis'] },
    ],
  },
];
