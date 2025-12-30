using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IBackgroundTaskQueue
    {
        void Enqueue (int submissionId);
        Task<int>DequeueAsync(CancellationToken cancellationToken);
    }
}