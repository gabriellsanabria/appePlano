import React from 'react';
import './Doc.scss';

const Doc = () => {
  return (
    <div className='DocContainer'>
      <h1>Instruções</h1>
      <div className="InstructionBox">
        {/* Comandos de Gerenciamento de Ambiente e Pacotes */}
        <div className="InstructionCategory">Gerenciamento de Ambiente e Pacotes:</div>
        <pre>
          <code>
            <kbd>rm -rf venv</kbd>
            Remover ambiente virtual.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>virtualenv myenv</kbd>
            Criar um novo ambiente virtual.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>pip cache purge</kbd>
            Limpar o cache do pip.
          </code>
        </pre>

        {/* Acesso ao Servidor Remoto */}
        <div className="InstructionCategory">Acesso ao Servidor Remoto:</div>
        <pre>
          <code>
            <kbd>ssh -i /c/Windows/developer/appEplano/LightsailDefaultKey-us-east-1.pem ec2-user@54.221.22.223</kbd>
            Conectar ao servidor via SSH.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>scp -i /c/Windows/developer/appEplano/LightsailDefaultKey-us-east-1.pem /c/Windows/developer/appEplano/api-eplano/app.py ec2-user@54.221.22.223:/home/ec2-user</kbd>
            Enviar arquivo para o servidor.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>scp -r -i /c/Windows/developer/appEplano/LightsailDefaultKey-us-east-1.pem /c/Windows/developer/appEplano/api-eplano ec2-user@54.221.22.223:/home/ec2-user</kbd>
            Enviar pasta para o servidor.
          </code>
        </pre>

        {/* Configuração do Servidor Nginx */}
        <div className="InstructionCategory">Configuração do Servidor Nginx:</div>
        <pre>
          <code>
            <kbd>sudo nano /etc/nginx/conf.d/api.eplano.com.br.conf</kbd>
            Editar o arquivo de configuração do Nginx.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>sudo systemctl restart nginx</kbd>
            Reiniciar o servidor Nginx.
          </code>
        </pre>

        {/* Identificação e Encerramento do Processo em Execução */}
        <div className="InstructionCategory">Identificação e Encerramento do Processo em Execução:</div>
        <pre>
          <code>
            <kbd>sudo lsof -i :5000</kbd>
            Identificar o programa em execução na porta 5000.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>kill PID</kbd>
            Encerrar o processo em execução.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>sudo netstat -tuln | grep 5000</kbd>
            Verificar se a porta está livre.
          </code>
        </pre>

        {/* Iniciar o Servidor */}
        <div className="InstructionCategory">Iniciar o Servidor:</div>
        <pre>
          <code>
            <kbd>source myenv/bin/activate</kbd>
            Iniciar o ambiente virtual.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>python run.py</kbd>
            Iniciar o servidor (modo padrão).
          </code>
        </pre>
        <pre>
          <code>
            <kbd>nohup python run.py &</kbd>
            Iniciar o servidor sem interrupção.
          </code>
        </pre>

        {/* Encerrar o Servidor Nohup */}
        <div className="InstructionCategory">Encerrar o Servidor Nohup:</div>
        <pre>
          <code>
            <kbd>ps aux | grep 'python run.py'</kbd>
            Identificar o processo.
          </code>
        </pre>
        <pre>
          <code>
            <kbd>kill PID</kbd>
            Encerrar o processo.
          </code>
        </pre>
      </div>
    </div>
  );
}

export default Doc;
