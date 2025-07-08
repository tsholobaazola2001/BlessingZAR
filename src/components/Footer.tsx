import React from 'react';
import { Heart, Code, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">BlessingZAR</h3>
            <p className="text-gray-300 text-sm">
              A decentralized community lending platform built on Celo testnet. 
              Empowering financial inclusion through blockchain technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Celo Testnet</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Discord</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-300">
            <span className="text-sm">Built with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm">for the community</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Code className="w-4 h-4" />
            <span className="text-sm">Open Source</span>
            <Globe className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};