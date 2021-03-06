FROM python:3.7-slim
LABEL maintainer="Orchest B.V. https://www.orchest.io"

# refresh SSL certificates
RUN apt-get update && apt-get install -y git curl ca-certificates && update-ca-certificates --fresh

# install nodejs for jupyterextension install support
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs

# Swap dash for normal bash to get more full fledged terminal session in Jupyter
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install Jupyter Lab
RUN pip3 install pip --upgrade && \
    pip3 install jupyterlab==3.0.0rc13 ipywidgets

COPY ./patch/handlers.py /usr/local/lib/python3.7/site-packages/jupyter_server/gateway/handlers.py

# Get our custom extensions for jupyterlab.
RUN git clone https://github.com/orchest/visual-tags.git /jupyter-extensions/visual-tags && \
    git clone https://github.com/orchest/orchest-integration.git /jupyter-extensions/orchest-integration && \
    jupyter labextension install /jupyter-extensions/visual-tags --no-build && \
    jupyter labextension install /jupyter-extensions/orchest-integration --no-build && \
    jupyter labextension install @jupyter-widgets/jupyterlab-manager

COPY ./jupyter_server_config.py /root/.jupyter/jupyter_server_config.py

# Hardcoded /project-dir because Python config can't be injected into Dockerfile
WORKDIR /project-dir

ARG ORCHEST_VERSION
ENV ORCHEST_VERSION=${ORCHEST_VERSION}
ENTRYPOINT [ "jupyter", "lab" ]
