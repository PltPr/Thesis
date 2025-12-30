using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.Repository
{
    public class BackgroundTaskQueue :IBackgroundTaskQueue
    {
        private readonly Channel<int> _queue = Channel.CreateUnbounded<int>();

        public async Task<int> DequeueAsync(CancellationToken cancellationToken)
        => await _queue.Reader.ReadAsync(cancellationToken);
        

        public void Enqueue(int submissionId)
        => _queue.Writer.TryWrite(submissionId);
    }
}